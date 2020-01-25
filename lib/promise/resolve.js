const _get = require("./get");

let lib;

function resolve(value) {
  return lib._get().resolve(value);
}

lib = {
  _get,
  resolve
};

module.exports = lib.resolve;
module.exports.lib = lib;
