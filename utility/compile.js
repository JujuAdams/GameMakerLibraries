/**
 * @file Compile all library documentation into human-friendly files.
 */

const fs = require('fs');
const { compileFromFile } = require('json-schema-to-typescript');
const prettier = require('prettier');
const { unique, readJSON, assert } = require('./utility.js');
const Ajv = require('ajv').default;
const addFormats = require('ajv-formats').default;
const { compileReadme } = require('./compileReadme');

const librariesPath = './libraries.json';
const librariesSchemaPath = './utility/libraries-schema.json';
const librariesTypesPath = './utility/libraries-schema.d.ts';
const tagsPath = './tags.txt';

/**
 * @typedef {import('./libraries-schema.js').GameMakerLibraryData} Libraries
 * @typedef {import('./libraries-schema.json')} Schema
 */

/**
 * Load tags from the tags file and convert them to an array of unique
 * strings. Rewrite the file to ensure consistency.
 */
function loadAndUpdateTags() {
  const tags = unique(
    fs
      .readFileSync(tagsPath, 'utf8')
      .trim()
      .split(/\r?\n/)
      .filter((x) => x)
      .sort()
  );
  fs.writeFileSync(tagsPath, tags.join('\n'));
  return tags;
}

async function loadAndUpdateValidator() {
  // Load the libraries schema and update it if needed
  /** @type {Schema} */
  const librariesSchema = readJSON(librariesSchemaPath);
  librariesSchema.definitions.tag.enum = loadAndUpdateTags();
  // Save any changes made
  fs.writeFileSync(
    librariesSchemaPath,
    prettier.format(JSON.stringify(librariesSchema), { parser: 'json' })
  );

  // Create the validator (which will also ensure the schema is valid)
  const ajv = new Ajv();
  // Add "format" validators so we can get free/cheap validation of strings
  addFormats(ajv, ['uri', 'date']);

  /** @type {import('ajv').ValidateFunction<Schema>} */
  const validate = ajv.compile(librariesSchema);

  // Create a Typescript types file from the schema, to make it easier
  // to code with IDE support.
  const asTypescriptString = await compileFromFile(librariesSchemaPath);
  fs.writeFileSync(librariesTypesPath, asTypescriptString);

  return validate;
}

/**
 *
 * @param { Awaited<ReturnType<typeof loadAndUpdateValidator>>} validate
 */
function loadAndUpdateLibraries(validate) {
  // Load the library data and test it against the schema
  /** @type {Libraries} */
  const libraries = readJSON(librariesPath);
  const isValid = validate(libraries);
  if (!isValid) {
    console.error(validate.errors);
    process.exit(1);
  }
  // Check author refs to make sure they all exist
  libraries.libraries.forEach((library) => {
    library.authors?.forEach((author) => {
      if (typeof author == 'string') {
        const referencedAuthor = libraries.authors[author];
        // @ts-ignore
        assert(referencedAuthor, `Author key "${author}" not found.`);
      }
    });
  });

  // Prettify
  fs.writeFileSync(
    librariesPath,
    prettier.format(JSON.stringify(libraries), { parser: 'json' })
  );
  return libraries;
}

async function main() {
  const validate = await loadAndUpdateValidator();
  const libraries = loadAndUpdateLibraries(validate);
  compileReadme(libraries);
}

main();
