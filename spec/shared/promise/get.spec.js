const bluebird = require('bluebird');
const lib = require('../../../shared/promise/get').lib;

describe('get', () => {
  describe('get', () => {
    it('should work', () => {
      expect(lib.get()).toEqual(bluebird);
    });
  }); // get

  describe('_update', () => {
    it('should work', () => {
      expect(lib.get()).toEqual(bluebird);
      lib._update('{promise}');
      expect(lib.get()).toEqual('{promise}');
      lib._update(bluebird);
      expect(lib.get()).toEqual(bluebird);
    });
  }); // _update
});
