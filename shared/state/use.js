const _methods = require('../fp/methods');
const useClass = require('./useClass');

let lib;

function _useReducer(object, accum, elem) {
  accum[elem] = new useClass(object);
  return accum;
}

function use(object) {
  return Object.keys(object).reduce(lib._useReducer(object), {});
}

lib = _methods({
  curry: {
    _useReducer
  },
  normal: {
    use
  }
});

module.exports = lib.use;
module.exports.lib = lib;
