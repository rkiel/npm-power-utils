const _shared = require('../../shared');

let lib;

function get(path, defaultValue, object) {
  return _shared.im.get(object, path.split('.'), defaultValue);
}

lib = _shared.methods({
  curry: {
    get
  },
  normal: {}
});

module.exports = lib.get;
module.exports.lib = lib;
