const fs = require('fs');
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

/**
 * @param {any} condition
 * @param {string} message
 * @returns {asserts condition}
 */
exports.assert = function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
};
