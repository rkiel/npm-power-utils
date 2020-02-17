const useClass = require('../../../shared/state/useClass');

describe('useClass', () => {
  let one, state;
  beforeEach(
    () =>
      (state = {
        one: { a: 'AAA', b: 'BBB', c: { d: 'DDD' } }
      })
  );
  beforeEach(() => (one = new useClass(state, 'one')));

  describe('get', () => {
    it('should work', () => {
      expect(one.get()).toEqual({ a: 'AAA', b: 'BBB', c: { d: 'DDD' } });
    });
    it('should work', () => {
      expect(one.get('c.d')).toEqual('DDD');
    });
    it('should work', () => {
      expect(one.get('c')).toEqual({ d: 'DDD' });
    });
  }); // get

  describe('set', () => {
    it('should work', () => {
      expect(one.set('a', 'aaa')).toEqual({
        one: { a: 'aaa', b: 'BBB', c: { d: 'DDD' } }
      });
      expect(state).toEqual({
        one: { a: 'AAA', b: 'BBB', c: { d: 'DDD' } }
      });
    });
  }); // set

  describe('init', () => {
    it('should work', () => {
      expect(one.init({ e: 'EEE' })).toEqual({
        one: { e: 'EEE' }
      });
      expect(state).toEqual({
        one: { a: 'AAA', b: 'BBB', c: { d: 'DDD' } }
      });
    });
  }); // init

  describe('assign', () => {
    it('should work', () => {
      expect(one.assign({ e: 'EEE' })).toEqual({
        one: { a: 'AAA', b: 'BBB', c: { d: 'DDD' }, e: 'EEE' }
      });
      expect(state).toEqual({
        one: { a: 'AAA', b: 'BBB', c: { d: 'DDD' } }
      });
    });
    it('should work', () => {
      expect(one.assign({ b: { e: 'EEE' } })).toEqual({
        one: { a: 'AAA', b: { e: 'EEE' }, c: { d: 'DDD' } }
      });
      expect(state).toEqual({
        one: { a: 'AAA', b: 'BBB', c: { d: 'DDD' } }
      });
    });
  }); // assign
}); // useClass
