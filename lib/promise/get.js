let _promise = Promise;

let lib;

function _update(p) {
  _promise = p;
}

function get() {
  return _promise;
}

lib = {
  _update,
  get
};

module.exports = lib.get;
module.exports.lib = lib;
