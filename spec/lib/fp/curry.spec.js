const _curry = require('../../../lib/fp/curry');

describe('curry', () => {
  it('should work', () => {
    _curry(x => x);
  });
});
