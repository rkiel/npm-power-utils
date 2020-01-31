const _methods = require("../fp/methods");
const _get_lib = require("./get").lib;

let lib;

function set(p) {
  lib._get_lib._update(p);
}

lib = _methods({
  normal: {
    _get_lib,
    set
  },
  module,
  exports: "set"
});
