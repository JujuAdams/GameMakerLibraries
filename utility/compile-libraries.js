/**
 * @file compile-libraries.js
 * @description Compile all library documentation into human-friendly files.
 */

const fs = require('fs');
const yaml = require('yaml');
const ajv = require('ajv');
const { compileFromFile } = require('json-schema-to-typescript');
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

// Create a Typescript types file from the schema, to make it easier
// to code with IDE support.
compileFromFile(librariesSchemaPath).then((ts) => {
  fs.writeFileSync(librariesTypesPath, ts);
});

// Load the library data and test it against the schema
/** @type {import('./libraries-schema.js').GameMakerLibraryData} */
const libraries = readYAML(librariesPath);
// TODO: TEST THE LIBRARIES
// TODO: WRITE TO README.MD
