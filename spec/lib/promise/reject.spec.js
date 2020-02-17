const _reject = require('../../../lib/promise/reject');

function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

describe('reject', () => {
  it('should work', () => {
    expect(isFunction(_reject)).toEqual(true);
  });
});
