const _shared = require('../../../shared');

let lib;

function set(path, value, object) {
  return _shared.im.set(object, path.split('.'), value);
}

lib = _shared.fp.methods({
  curry: {
    set
  },
  normal: {}
});

module.exports = lib.set;
module.exports.lib = lib;
