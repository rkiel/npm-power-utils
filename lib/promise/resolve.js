const _methods = require("../fp/methods");
const _get = require("./get");

let lib;

function resolve(value) {
  return lib._get().resolve(value);
}

lib = _methods({
  normal: {
    _get,
    resolve
  },
  module,
  exports: "resolve"
});
