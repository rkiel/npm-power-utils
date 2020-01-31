const _shared = require("../shared");
const _fp = require("../fp");

let lib;

function set(object, path, value) {
  return _shared.im.set(object, path.split("."), value);
}

lib = _fp.methods({
  curry: {
    set
  },
  module,
  exports: "set"
});
