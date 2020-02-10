const _methods = require('../fp/methods');

let _promise = require('bluebird');

let lib;

function _update(p) {
  _promise = p;
}

function get() {
  return _promise;
}

lib = _methods({
  normal: {
    _update,
    get
  }
});

module.exports = lib.get;
module.exports.lib = lib;
