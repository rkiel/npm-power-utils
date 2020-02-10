let lib;

function _curryOne(f) {
  return function(one) {
    return function() {
      return f(one);
    };
  };
}

function _curryMany(f, size, ...params) {
  if (f === undefined) return lib._curryMany;
  if (size === undefined) return lib._curryMany.bind(null, f);
  if (params.length < size) {
    return lib._curryMany.bind(null, f, size, ...params);
  } else {
    return f(...params);
  }
}

function curry(f) {
  if (f.length === 0) {
    return f;
  } else if (f.length === 1) {
    return lib._curryOne(f);
  } else {
    return lib._curryMany(f, f.length);
  }
}

lib = {
  _curryOne,
  _curryMany,
  curry
};

module.exports = lib.curry;
module.exports.lib = lib;
