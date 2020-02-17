const _methods = require('../fp/methods');

let lib;

class useClass {
  get() {}
  set() {}
}

lib = _methods({
  normal: {
    useClass
  }
});

module.exports = lib.useClass;
