let lib;

function _isObject(o) {
  return o instanceof Object && o.constructor === Object;
}

function _ensureObject(object, part) {
  if (lib._isObject(object)) {
    if (object[part] === undefined || object[part] === null) {
      return Object.assign({}, object, { [part]: {} });
    } else if (lib._isObject(object[part])) {
      return object;
    } else {
      return Object.assign({}, object, { [part]: {} });
    }
  } else {
    return { [part]: {} };
  }
}

function _set(object, parts, value) {
  if (parts.length === 0) {
    return object;
  } else if (parts.length === 1) {
    const part = parts.shift();
    return Object.assign({}, object, { [part]: value });
  } else {
    const first = parts.shift();
    const thisLevel = lib._ensureObject(object, first);

    const newObject = lib._set(thisLevel[first], parts, value);
    return Object.assign({}, thisLevel, { [first]: newObject });
  }
}

function set(object, path, value) {
  return lib._set(object, path.split("."), value);
}

lib = {
  _isObject,
  _ensureObject,
  _set,
  set
};

module.exports = lib.set;
module.exports.lib = lib;
