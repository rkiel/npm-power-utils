const immer = require('immer');

function _get(object, parts, value) {
  const o = object === undefined ? {} : object;
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
