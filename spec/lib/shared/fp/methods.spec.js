const lib = require('../../../../lib/shared/fp/methods').lib;

describe('methods', () => {
  describe('methods', () => {
    let one, two, three, four;
    beforeEach(() => (one = x => x * 2));
    beforeEach(() => (two = (a, b) => a * b));
    beforeEach(() => (three = (a, b, c) => a * b * c));
    beforeEach(() => (four = (a, b, c, d) => a * b * c * d));

    it('should work with nothing', () => {
      const m = lib.methods();
      expect(m).toEqual({});
    });
    it('should work with an object', () => {
      const m = lib.methods({});
      expect(m).toEqual({});
    });
    it('should work with an object', () => {
      const m = lib.methods({
        normal: {
          one
        }
      });
      expect(Object.keys(m).sort()).toEqual(['one']);
      expect(m.one(3)).toEqual(6);
    });
    it('should work with an object', () => {
      const m = lib.methods({
        normal: {
          one,
          two
        }
      });
      expect(Object.keys(m).sort()).toEqual(['one', 'two']);
      expect(m.one(3)).toEqual(6);
      expect(m.two(2, 3)).toEqual(6);
    });
    it('should work with an object', () => {
      const m = lib.methods({
        curry: {
          two
        }
      });
      expect(Object.keys(m).sort()).toEqual(['two']);
      expect(m.two(2, 3)).toEqual(6);
      expect(m.two(2)(3)).toEqual(6);
    });
    it('should work with an object', () => {
      const m = lib.methods({
        curry: {
          two,
          three
        }
      });
      expect(Object.keys(m).sort()).toEqual(['three', 'two']);
      expect(m.two(2, 3)).toEqual(6);
      expect(m.two(2)(3)).toEqual(6);
      expect(m.three(2, 3, 4)).toEqual(24);
      expect(m.three(2)(3)(4)).toEqual(24);
    });
    it('should work with an object', () => {
      const m = lib.methods({
        curry: {
          two
        },
        normal: {
          one
        }
      });
      expect(Object.keys(m).sort()).toEqual(['one', 'two']);
      expect(m.one(3)).toEqual(6);
      expect(m.two(2, 3)).toEqual(6);
      expect(m.two(2)(3)).toEqual(6);
    });
    it('should work with an object', () => {
      const m = lib.methods({
        curry: {
          two,
          three
        },
        normal: {
          one,
          four
        }
      });
      expect(Object.keys(m).sort()).toEqual(['four', 'one', 'three', 'two']);
      expect(m.one(3)).toEqual(6);
      expect(m.two(2, 3)).toEqual(6);
      expect(m.two(2)(3)).toEqual(6);
      expect(m.three(2, 3, 4)).toEqual(24);
      expect(m.three(2)(3)(4)).toEqual(24);
      expect(m.four(2, 3, 4, 5)).toEqual(120);
    });
    it('should work with a module', () => {
      const module = {};
      const m = lib.methods({
        normal: {
          one,
          two
        },
        module
      });
      expect(Object.keys(m).sort()).toEqual(['one', 'two']);
      expect(Object.keys(module.exports).sort()).toEqual(['one', 'two']);
    });
    it('should work with a module', () => {
      const module = {};
      const m = lib.methods({
        curry: {
          one,
          two
        },
        module
      });
      expect(Object.keys(m).sort()).toEqual(['one', 'two']);
      expect(Object.keys(module.exports).sort()).toEqual(['one', 'two']);
    });
    it('should work with a module', () => {
      const module = {};
      const m = lib.methods({
        normal: {
          one,
          two
        },
        module,
        main: 'one'
      });
      expect(Object.keys(m).sort()).toEqual(['one', 'two']);
      expect(module.exports).toEqual(m.one);
      expect(Object.keys(module.exports.lib)).toEqual(['one', 'two']);
    });
    it('should work with a module', () => {
      const module = {};
      const m = lib.methods({
        normal: {
          one,
          two
        },
        module,
        exports: 'one'
      });
      expect(Object.keys(m).sort()).toEqual(['one', 'two']);
      expect(module.exports).toEqual(m.one);
      expect(Object.keys(module.exports.lib)).toEqual(['one', 'two']);
    });
    it('should work with a module', () => {
      const module = {};
      const m = lib.methods({
        curry: {
          one,
          two
        },
        module,
        exports: 'one'
      });
      expect(Object.keys(m).sort()).toEqual(['one', 'two']);
      expect(module.exports).toEqual(m.one);
      expect(Object.keys(module.exports.lib)).toEqual(['one', 'two']);
    });
  }); // methods
});
