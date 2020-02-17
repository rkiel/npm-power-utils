const lib = require('../../../shared/state/use').lib;

function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

describe('use', () => {
  it('should have get', () => {
    const state = { one: {}, two: {} };
    const { one, two } = lib.use(state);
    expect(isFunction(one.get)).toEqual(true);
    expect(isFunction(two.get)).toEqual(true);
  });
  it('should have set', () => {
    const state = { one: {}, two: {} };
    const { one, two } = lib.use(state);
    expect(isFunction(one.set)).toEqual(true);
    expect(isFunction(two.set)).toEqual(true);
  });
});
