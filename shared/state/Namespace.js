const _im = require('../im');

class Namespace {
  constructor(object, prefix) {
    this.object = object;
    this.prefix = prefix;
  }
  assign(value) {
    return _im.set(
      this.object,
      [this.prefix],
      Object.assign({}, this.object[this.prefix], value)
    );
  }
  init(value) {
    return _im.set(this.object, [this.prefix], value);
  }
  get(path, defaultValue) {
    if (path === undefined || path === null) {
      return this.object[this.prefix];
    } else {
      const parts = path.split('.');
      parts.unshift(this.prefix);
      return _im.get(this.object, parts, defaultValue);
    }
  }
  set(path, value) {
    if (arguments.length === 1) {
      return Object.keys(path).reduce((object, key) => {
        const parts = key.split('.');
        parts.unshift(this.prefix);
        return _im.set(object, parts, path[key]);
      }, this.object);
    } else {
      const parts = path.split('.');
      parts.unshift(this.prefix);
      return _im.set(this.object, parts, value);
    }
  }
}

module.exports = Namespace;
