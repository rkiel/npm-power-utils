let lib;

const _get_lib = require("./get").lib;

function set(p) {
  lib._get_lib._update(p);
}

lib = {
  _get_lib,
  set
};

module.exports = lib.set;
module.exports.lib = lib;
