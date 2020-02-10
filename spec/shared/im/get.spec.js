const lib = require('../../../shared/im/get').lib;

describe('get', () => {
  let object, defaultValue;
  beforeEach(() => (object = {}));
  beforeEach(() => (defaultValue = 1024));

  const s = x => x.split('.');

  it('should work', () => {
    object = undefined;
    expect(lib.get(object, s('one'))).toEqual(undefined);
    expect(lib.get(object, s('one'), defaultValue)).toEqual(defaultValue);
  });
  it('should work', () => {
    object = null;
    expect(lib.get(object, s('one'))).toEqual(undefined);
    expect(lib.get(object, s('one'), defaultValue)).toEqual(defaultValue);
  });
  it('should work', () => {
    object = {};
    expect(lib.get(object, s('one'))).toEqual(undefined);
    expect(lib.get(object, s('one'), defaultValue)).toEqual(defaultValue);
  });
  it('should work', () => {
    object = { one: 1 };
    expect(lib.get(object, s('one'))).toEqual(1);
    expect(lib.get(object, s('one'), defaultValue)).toEqual(1);
  });
  it('should work', () => {
    object = { one: 1 };
    expect(lib.get(object, s('one.two'))).toEqual(undefined);
    expect(lib.get(object, s('one.two'), defaultValue)).toEqual(defaultValue);
  });
  it('should work', () => {
    object = { one: 1, two: 2 };
    expect(lib.get(object, s('one.two'))).toEqual(undefined);
    expect(lib.get(object, s('one.two'), defaultValue)).toEqual(defaultValue);
  });
  it('should work', () => {
    object = { one: { two: 2 } };
    expect(lib.get(object, s('one.two'))).toEqual(2);
    expect(lib.get(object, s('one.two'), defaultValue)).toEqual(2);
  });
  it('should work', () => {
    object = { one: { three: 3 } };
    expect(lib.get(object, s('one.two'))).toEqual(undefined);
    expect(lib.get(object, s('one.two'), defaultValue)).toEqual(defaultValue);
  });
});
