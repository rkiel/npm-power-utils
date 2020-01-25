const pathTo = x => require("../../../" + x);
const lib = pathTo("lib/immutable/get").lib;

describe("get", () => {
  let object, value, defaultValue;
  beforeEach(() => (object = {}));
  beforeEach(() => (value = 1));
  beforeEach(() => (defaultValue = 1024));

  it("should work", () => {
    object = undefined;
    expect(lib.get(object, "one")).toEqual(undefined);
    expect(lib.get(object, "one", defaultValue)).toEqual(defaultValue);
  });
  it("should work", () => {
    object = null;
    expect(lib.get(object, "one")).toEqual(undefined);
    expect(lib.get(object, "one", defaultValue)).toEqual(defaultValue);
  });
  it("should work", () => {
    object = {};
    expect(lib.get(object, "one")).toEqual(undefined);
    expect(lib.get(object, "one", defaultValue)).toEqual(defaultValue);
  });
  it("should work", () => {
    object = { one: 1 };
    expect(lib.get(object, "one")).toEqual(1);
    expect(lib.get(object, "one", defaultValue)).toEqual(1);
  });
  it("should work", () => {
    object = { one: 1 };
    expect(lib.get(object, "one.two")).toEqual(undefined);
    expect(lib.get(object, "one.two", defaultValue)).toEqual(defaultValue);
  });
  it("should work", () => {
    object = { one: 1, two: 2 };
    expect(lib.get(object, "one.two")).toEqual(undefined);
    expect(lib.get(object, "one.two", defaultValue)).toEqual(defaultValue);
  });
  it("should work", () => {
    object = { one: { two: 2 } };
    expect(lib.get(object, "one.two")).toEqual(2);
    expect(lib.get(object, "one.two", defaultValue)).toEqual(2);
  });
  it("should work", () => {
    object = { one: { three: 3 } };
    expect(lib.get(object, "one.two")).toEqual(undefined);
    expect(lib.get(object, "one.two", defaultValue)).toEqual(defaultValue);
  });
});
