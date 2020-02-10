const _methods = require('../fp/methods');
const _get = require('./get');

let lib;

function resolve(value) {
  return _get().resolve(value);
}

lib = _methods({
  normal: {
    resolve
  }
});

module.exports = lib.resolve;
module.exports.lib = lib;
