const lib = require('../../../lib/shared/curry').lib;

describe('curry', () => {
  it('should work with no arguments', () => {
    const f = lib.curry(() => 0);
    expect(f()).toEqual(0);
  });
  it('should work with one argument', () => {
    const f = lib.curry(a => a);
    expect(f(2)()).toEqual(2);
  });
  it('should work with two arguments', () => {
    const f = lib.curry((a, b) => a * b);
    expect(f(2, 3)).toEqual(6);
    expect(f(2)(3)).toEqual(6);
  });
  it('should work with three arguments', () => {
    const f = lib.curry((a, b, c) => a * b * c);
    expect(f(2, 3, 4)).toEqual(24);
    expect(f(2)(3)(4)).toEqual(24);
  });
  it('should work with four arguments', () => {
    const f = lib.curry((a, b, c, d) => a * b * c * d);
    expect(f(2, 3, 4, 5)).toEqual(120);
    expect(f(2)(3)(4)(5)).toEqual(120);
    expect(f(2, 3, 4, 5, 6)).toEqual(120);
  });
});
