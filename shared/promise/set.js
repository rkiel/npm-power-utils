const _methods = require('../fp/methods');
const _get = require('./get').lib;

let lib;

function set(p) {
  _get._update(p);
}

lib = _methods({
  normal: {
    set
  }
});

module.exports = lib.set;
module.exports.lib = lib;
