const _methods = require('../methods');
const _get = require('./get');

let lib;

function reject(value) {
  return _get().reject(value);
}

lib = _methods({
  normal: {
    reject
  }
});

module.exports = lib.reject;
module.exports.lib = lib;
