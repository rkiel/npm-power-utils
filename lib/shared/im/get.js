const _methods = require('../methods');

let lib;

function _isObject(o) {
  return o instanceof Object && o.constructor === Object;
}

function _ensureObject(object) {
  if (lib._isObject(object)) {
    return object;
  } else {
    return {};
  }
}

function get(object, parts, defaultValue) {
  if (parts.length === 0) {
    return undefined;
  } else if (parts.length === 1) {
    const part = parts.shift();
    const thisLevel = lib._ensureObject(object);
    return thisLevel[part] === undefined ? defaultValue : thisLevel[part];
  } else {
    const first = parts.shift();
    const thisLevel = lib._ensureObject(object);
    return lib.get(thisLevel[first], parts, defaultValue);
  }
}

lib = _methods({
  normal: {
    _isObject,
    _ensureObject,
    get
  },
  module,
  exports: 'get'
});
