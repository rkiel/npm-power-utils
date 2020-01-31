const _shared = require("../../shared");
const _methods = require("../methods");

let lib;

function set(path, value, object) {
  return _shared.im.set(object, path.split("."), value);
}

lib = _methods({
  curry: {
    set
  },
  normal: {},
  module,
  exports: "set"
});
