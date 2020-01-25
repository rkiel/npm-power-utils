const _get = require("./get");

let lib;

function reject(value) {
  return lib._get().reject(value);
}

lib = {
  _get,
  reject
};

module.exports = lib.reject;
module.exports.lib = lib;
