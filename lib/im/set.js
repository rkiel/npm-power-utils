const _shared = require("../shared");

let lib;

function set(object, path, value) {
  if (value === undefined) return set.bind(null, object, path);

  return lib._shared.im.set(object, path.split("."), value);
}

lib = {
  _shared,
  set
};

module.exports = lib.set;
module.exports.lib = lib;
