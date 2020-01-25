const pathTo = x => require("../../" + x);
const lib = pathTo("lib/flow").lib;

describe("flow", () => {
  it("should work", () => {
    expect(lib.flow({})).toEqual(undefined);
  });
  it("should work", () => {
    const double = a => a * 2;
    expect(
      lib.flow({
        in: 2,
        now: double
      })
    ).toEqual(4);
  });
  it("should work", () => {
    const double = a => a * 2;
    expect(
      lib.flow({
        in: [2],
        now: [double]
      })
    ).toEqual(4);
  });
  it("should work", () => {
    const add = (a, b) => a + b;
    const double = a => a * 2;
    expect(
      lib.flow({
        in: [1, 2],
        now: [add]
      })
    ).toEqual(3);
  });
  it("should work", () => {
    const add = (a, b) => a + b;
    const double = a => a * 2;
    expect(
      lib.flow({
        in: [1, 2],
        now: [add, double]
      })
    ).toEqual(6);
  });
});
