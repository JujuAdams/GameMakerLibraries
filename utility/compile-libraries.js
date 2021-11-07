/**
 * @file compile-libraries.js
 * @description Compile all library documentation into human-friendly files.
 */

const fs = require('fs');
const Ajv = require('ajv').default;
const { compileFromFile } = require('json-schema-to-typescript');
const { html } = require('common-tags');
const { unique, readJSON, writeJSON, readYAML } = require('./utility.js');

const readmePath = './README.md';
const librariesPath = './libraries.yaml';
const librariesSchemaPath = './utility/libraries-schema.json';
const librariesTypesPath = './utility/libraries-schema.d.ts';
const tagsPath = './tags.txt';

/**
 * @typedef {import('./libraries-schema.js').GameMakerLibraryData} Libraries
 * @typedef {import('./libraries-schema.json')} Schema
 */

async function loadAndUpdateValidator() {
  // Load the libraries schema and update it if needed
  /** @type {Schema} */
  const librariesSchema = readJSON(librariesSchemaPath);
  librariesSchema.definitions.tag.enum = unique(
    fs
      .readFileSync(tagsPath, 'utf8')
      .trim()
      .split('\n')
      .filter((x) => x)
      .sort()
  );
  // Save any changes made
  writeJSON(librariesSchemaPath, librariesSchema);
  // Compile the schema to ensure it is valid
  const ajv = new Ajv();
  /** @type {import('ajv').ValidateFunction<Schema>} */
  const validate = ajv.compile(librariesSchema);

  // Create a Typescript types file from the schema, to make it easier
  // to code with IDE support.
  const asTypescriptString = await compileFromFile(librariesSchemaPath);
  fs.writeFileSync(librariesTypesPath, asTypescriptString);

  return validate;
}

/**
 * @param {Libraries} libraries
 */
function compileReadme(libraries) {
  /**
   * The "preamble" was taken directly from the original README.md file.
   */
  const preamble = html` <h1 align="center">${libraries.title}</h1>

    <p align="center">${libraries.description}</p>

    <p align="center">
      Come chat about GameMaker on
      <a href="https://discord.gg/8krYCqr">Juju's Discord server</a>
    </p>`;

  let markdownComponents = [
    preamble,
    '## Libraries',
    ...libraries.libraries.map((library) => {
      // NOTE: This is currently just re-creating the original markdown
      //       but it could be changed to add tags, authors, and any other
      //       information that gets added.
      return `[${library.title}](${library.url})`;
    }),
  ];
  fs.writeFileSync(readmePath, markdownComponents.join('\n\n'));
}

/**
 *
 * @param { Awaited<ReturnType<typeof loadAndUpdateValidator>>} validate
 */
function loadLibraries(validate) {
  // Load the library data and test it against the schema
  /** @type {Libraries} */
  const libraries = readYAML(librariesPath);
  const isValid = validate(libraries);
  if (!isValid) {
    console.error(validate.errors);
    process.exit(1);
  }
  return libraries;
}

async function main() {
  const validate = await loadAndUpdateValidator();
  const libraries = loadLibraries(validate);
  compileReadme(libraries);
}

main();
