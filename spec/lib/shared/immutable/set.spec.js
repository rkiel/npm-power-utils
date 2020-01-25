const pathTo = x => require("../../../../" + x);
const lib = pathTo("lib/shared/immutable/set").lib;

const s = x => x.split(".");

describe("set", () => {
  let object, value;
  beforeEach(() => (object = {}));
  beforeEach(() => (value = 1));

  it("should work", () => {
    object = undefined;
    expect(lib.set(object, s("one"), value)).toEqual({ one: 1 });
    expect(object).toEqual(undefined);
  });
  it("should work", () => {
    object = null;
    expect(lib.set(object, s("one"), value)).toEqual({ one: 1 });
    expect(object).toEqual(null);
  });
  it("should work", () => {
    object = {};
    expect(lib.set(object, s("one"), value)).toEqual({ one: 1 });
    expect(object).toEqual({});
  });
  it("should work", () => {
    object = {};
    expect(lib.set(object, s("one"), null)).toEqual({ one: null });
    expect(object).toEqual({});
  });
  it("should work", () => {
    object = {};
    expect(lib.set(object, s("one.two"), value)).toEqual({ one: { two: 1 } });
    expect(object).toEqual({});
  });
  it("should work", () => {
    object = { one: { three: 3, four: [1] } };
    expect(lib.set(object, s("one.two"), value)).toEqual({
      one: { three: 3, two: 1, four: [1] }
    });
    expect(object).toEqual({ one: { three: 3, four: [1] } });
  });
  it("should work", () => {
    object = { one: { three: 3, four: [1] } };
    expect(lib.set(object, s("one.two.five"), value)).toEqual({
      one: { three: 3, two: { five: 1 }, four: [1] }
    });
    expect(object).toEqual({ one: { three: 3, four: [1] } });
  });
  it("should work", () => {
    object = { one: { two: { three: 3 } } };
    expect(lib.set(object, s("one.two"), value)).toEqual({ one: { two: 1 } });
    expect(object).toEqual({ one: { two: { three: 3 } } });
  });
});
