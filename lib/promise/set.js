let lib;

const get_lib = require("./get").lib;

function set(p) {
  get_lib._update(p);
}

lib = {
  set
};

module.exports = lib.set;
module.exports.lib = lib;
