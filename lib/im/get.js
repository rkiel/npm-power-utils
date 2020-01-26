const _shared = require("../shared");

function get(object, path, defaultValue) {
  return lib._shared.im.get(object, path.split("."), defaultValue);
}

lib = {
  _shared,
  get
};

module.exports = lib.get;
module.exports.lib = lib;