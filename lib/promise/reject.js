const _methods = require("../fp/methods");
const _get = require("./get");

let lib;

function reject(value) {
  return lib._get().reject(value);
}

lib = _methods({
  normal: {
    _get,
    reject
  },
  module,
  exports: "reject"
});
