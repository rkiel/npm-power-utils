const _shared = require("../shared");
const _fp = require("../fp");

function get(object, path, defaultValue) {
  return _shared.im.get(object, path.split("."), defaultValue);
}

lib = _fp.methods({
  normal: {
    get
  },
  module,
  exports: "get"
});
