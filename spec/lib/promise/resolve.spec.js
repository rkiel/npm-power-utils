const _resolve = require('../../../lib/promise/resolve');

function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

describe('resolve', () => {
  it('should work', () => {
    expect(isFunction(_resolve)).toEqual(true);
  });
});
