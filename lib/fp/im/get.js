const _shared = require("../../shared");
const _methods = require("../methods");

let lib;

function get(path, defaultValue, object) {
  return _shared.im.get(object, path.split("."), defaultValue);
}

lib = _methods({
  curry: {
    get
  },
  normal: {},
  module,
  exports: "get"
});
