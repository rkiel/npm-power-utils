let lib;

const _fp = require("./fp");

function _normalReducer(normal, accum, elem) {
  accum[elem] = normal[elem];
  return accum;
}

function _curryReducer(curry, accum, elem) {
  accum[elem] = _fp.curry(curry[elem]);
  return accum;
}

function _keys(object) {
  return Object.keys(object || {});
}

function methods(config) {
  if (config) {
    const normal = lib
      ._keys(config.normal)
      .reduce(lib._normalReducer(config.normal), {});
    const curry = lib
      ._keys(config.curry)
      .reduce(lib._curryReducer(config.curry), {});
    return Object.assign(normal, curry);
  } else {
    return {};
  }
}

lib = {
  _normalReducer: _fp.curry(_normalReducer),
  _curryReducer: _fp.curry(_curryReducer),
  _keys,
  methods
};

module.exports = lib.methods;
module.exports.lib = lib;
