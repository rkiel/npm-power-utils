const _shared = require("../../shared");

let lib;

function set(path, value, object) {
  if (object === undefined) return set.bind(null, path, value);

  return lib._shared.immutable.set(object, path.split("."), value);
}

lib = {
  _shared,
  set
};

module.exports = lib.set;
module.exports.lib = lib;
