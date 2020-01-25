const pathTo = x => require("../../" + x);
const lib = pathTo("lib/flow").lib;

describe("flow", () => {
  it("should work", () => {
    expect(lib.flow({})).toEqual(undefined);
  });
  it("should work", () => {
    expect(lib.flow({ output: 400 })).toEqual(400);
  });
  it("should work", () => {
    const double = a => a * 2;
    expect(
      lib.flow({
        input: 2,
        now: double
      })
    ).toEqual(4);
  });
  it("should work", () => {
    const double = a => a * 2;
    expect(
      lib.flow({
        input: 2,
        now: double,
        output: 400
      })
    ).toEqual(400);
  });
  it("should work", () => {
    const double = a => a * 2;
    expect(
      lib.flow({
        input: [2],
        now: [double]
      })
    ).toEqual(4);
  });
  it("should work", () => {
    const add = (a, b) => a + b;
    expect(
      lib.flow({
        input: [1, 2],
        now: [add]
      })
    ).toEqual(3);
  });
  it("should work", () => {
    const add = (a, b) => a + b;
    const double = a => a * 2;
    expect(
      lib.flow({
        input: [1, 2],
        now: [add, double]
      })
    ).toEqual(6);
  });
});
