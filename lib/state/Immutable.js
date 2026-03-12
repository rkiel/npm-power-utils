const immer = require('immer');

function _isObject(x) {
  if (typeof x !== 'object' || x === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(x);
  if (prototype !== Object.prototype && prototype !== null) {
    return false;
  }

  return !Array.isArray(x) && !(Symbol.iterator in x) && !(Symbol.toStringTag in x);
}

function _get(object, parts, value) {
  const o = object === undefined ? {} : object;
  if (!_isObject(o)) {
    throw new Error('Not an object');
  }
  if (parts.length > 1) {
    const first = parts.shift();
    return _get(o[first], parts, value);
  } else {
    const first = parts.shift();
    return o[first] === undefined ? value : o[first];
  }
}

function _set(object, parts, value) {
  const o = object === undefined ? {} : object;
  if (!_isObject(o)) {
    throw new Error('Not an object');
  }
  if (parts.length > 1) {
    const first = parts.shift();
    o[first] = _set(o[first], parts, value);
  } else {
    const first = parts.shift();
    o[first] = value;
  }
  return o;
}

class Immutable {
  constructor(state, key) {
    this.state = state;
    this.key = key;
  }

  assign(value) {
    if (!_isObject(this.state[this.key])) {
      throw new Error('Not an object');
    }
    return immer.produce(this.state, (draft) => {
      draft[this.key] = Object.assign({}, draft[this.key], value);
    });
  }

  init(value) {
    return immer.produce(this.state, (draft) => {
      draft[this.key] = value;
    });
  }

  get(path, defaultValue) {
    if (path === undefined) {
      return this.state[this.key];
    } else {
      return _get(this.state[this.key], path.split('.'), defaultValue);
    }
  }

  set(path, value) {
    return immer.produce(this.state, (draft) => {
      draft[this.key] = _set(draft[this.key], path.split('.'), value);
    });
  }
}

module.exports = Immutable;
