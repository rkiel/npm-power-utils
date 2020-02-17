const _set = require('../../../lib/promise/set');

function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

describe('set', () => {
  it('should work', () => {
    expect(isFunction(_set)).toEqual(true);
  });
});
