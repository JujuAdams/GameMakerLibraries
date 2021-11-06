const fs = require('fs');
const yaml = require('yaml');
/**
 * @template {any} T
 * @param {Array<T>} arr
 * @returns {Array<T>}
 */
exports.unique = function unique(arr) {
  return [...new Set(arr)];
};

exports.readJSON = function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
};

exports.writeJSON = function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

exports.readYAML = function readYAML(file) {
  return yaml.parse(fs.readFileSync(file, 'utf8'));
};

exports.writeYAML = function writeYAML(file, data) {
  fs.writeFileSync(file, yaml.stringify(data));
};
