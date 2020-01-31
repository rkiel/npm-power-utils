const _methods = require("../fp/methods");

let _promise = Promise;

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
  },
  module,
  exports: "get"
});
