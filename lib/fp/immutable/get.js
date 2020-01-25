const _shared = require("../../shared");

let lib;

function get(path, defaultValue, object) {
  if (object === undefined) return get.bind(null, path, defaultValue);

  return lib._shared.immutable.get(object, path.split("."), defaultValue);
}

lib = {
  _shared,
  get
};

module.exports = lib.get;
module.exports.lib = lib;
