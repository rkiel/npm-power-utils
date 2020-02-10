let lib;

const _curry = require('./curry');

function _passThru(f) {
  return f;
}

function _reducer(wrapper, curry, accum, elem) {
  accum[elem] = wrapper(curry[elem]);
  return accum;
}

function _keys(object) {
  return Object.keys(object || {});
}

function methods(config) {
  if (config) {
    const normal = lib
      ._keys(config.normal)
      .reduce(lib._reducer(lib._passThru, config.normal), {});
    const curry = lib
      ._keys(config.curry)
      .reduce(lib._reducer(_curry, config.curry), {});
    const object = Object.assign(normal, curry);

    if (config.module) {
      if (config.main) {
        config.module.exports = object[config.main];
        config.module.exports.lib = object;
      } else if (config.exports) {
        config.module.exports = object[config.exports];
        config.module.exports.lib = object;
      } else {
        config.module.exports = object;
      }
    }

    return object;
  } else {
    return {};
  }
}

lib = {
  _reducer: _curry(_reducer),
  _passThru,
  _keys,
  methods
};

module.exports = lib.methods;
module.exports.lib = lib;
