const _get = require('../../../lib/promise/get');

function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

describe('get', () => {
  it('should work', () => {
    expect(isFunction(_get)).toEqual(true);
  });
});
