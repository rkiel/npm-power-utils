const Immutable = require('../../../lib/state/Immutable');

describe('Immutable', () => {
  describe('init', () => {
    it('should work', () => {
      const state = {};
      const im = new Immutable(state, 'geddy');
      expect(im.init({ one: 1 })).toEqual({ geddy: { one: 1 } });
      expect(state).toEqual({});
    });

    it('should work', () => {
      const state = { geddy: { two: 2 } };
      const im = new Immutable(state, 'geddy');
      expect(im.init({ one: 1 })).toEqual({ geddy: { one: 1 } });
      expect(state).toEqual({ geddy: { two: 2 } });
    });
  });

  describe('assign', () => {
    it('should work', () => {
      const state = { geddy: { two: 2 } };
      const im = new Immutable(state, 'geddy');
      expect(im.assign({ one: 1 })).toEqual({ geddy: { two: 2, one: 1 } });
      expect(state).toEqual({ geddy: { two: 2 } });
    });
  });

  describe('get', () => {
    it('should work', () => {
      const alex = { alpha: 'a' };
      const geddy = { beta: 'b', one: { gamma: 'g' } };
      const state = { alex, geddy };
      const im = new Immutable(state, 'geddy');
      expect(im.get('one', 1)).toEqual({ gamma: 'g' });
      expect(im.get('two')).toEqual(undefined);
      expect(im.get('two', 1)).toEqual(1);
      expect(im.get('one.two', 2)).toEqual(2);
      expect(im.get('one.two.three', 3)).toEqual(3);
      expect(im.get('beta', 1)).toEqual('b');
      expect(im.get('two', 1)).toEqual(1);
      expect(im.get()).toEqual(geddy);
    });
  });

  describe('set', () => {
    it('should work', () => {
      const alex = { alpha: 'a' };
      const geddy = { beta: 'b', one: { gamma: 'g' } };
      const state = { alex, geddy };
      const im = new Immutable(state, 'geddy');
      expect(im.set('one', 11)).toEqual({ alex, geddy: { beta: 'b', one: 11 } });
      expect(im.set('two', 22)).toEqual({ alex, geddy: { beta: 'b', one: { gamma: 'g' }, two: 22 } });
      expect(im.set('beta', 'B')).toEqual({ alex, geddy: { beta: 'B', one: { gamma: 'g' } } });
      expect(im.set('one.gamma', 'G')).toEqual({ alex, geddy: { beta: 'b', one: { gamma: 'G' } } });
      expect(im.set('one.two', 222)).toEqual({ alex, geddy: { beta: 'b', one: { gamma: 'g', two: 222 } } });
      expect(im.set('one.two.three', 3333)).toEqual({
        alex,
        geddy: { beta: 'b', one: { gamma: 'g', two: { three: 3333 } } }
      });
      expect(state).toEqual({ alex, geddy });
    });
  });
});
