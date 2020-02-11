const bluebird = require('bluebird');
const _get = require('../../../shared/promise/get');
const lib = require('../../../shared/promise/set').lib;

describe('set', () => {
  describe('set', () => {
    it('should work', () => {
      expect(_get()).toEqual(bluebird);
      lib.set('{promise}');
      expect(_get()).toEqual('{promise}');
      lib.set(bluebird);
      expect(_get()).toEqual(bluebird);
    });
  }); // _update
});
