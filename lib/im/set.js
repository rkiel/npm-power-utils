const _shared = require('../shared');

let lib;

function set(object, path, value) {
  return _shared.im.set(object, path.split('.'), value);
}

lib = _shared.methods({
  curry: {
    set
  }
});

module.exports = lib.set;
module.exports.lib = lib;
