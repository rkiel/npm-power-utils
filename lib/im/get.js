const _shared = require('../../shared');

let lib;

function get(object, path, defaultValue) {
  return _shared.im.get(object, path.split('.'), defaultValue);
}

lib = _shared.fp.methods({
  normal: {
    get
  }
});

module.exports = lib.get;
module.exports.lib = lib;
