const pathTo = x => require("../../../" + x);
const lib = pathTo("lib/fp/flow").lib;

describe("flow", () => {
  it("should work", () => {
    expect(lib.flow()).toEqual(undefined);
  });
  it("should work", () => {
    expect(lib.flow({})).toEqual(undefined);
  });
  it("should work", () => {
    expect(lib.flow({ input: 2 })).toEqual(undefined);
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
  it("should work", () => {
    const add = (a, b) => a + b;
    return lib
      .flow({
        input: [1, 2],
        promise: add
      })
      .then(result => expect(result).toEqual(3));
  });
  it("should work", () => {
    const add = (a, b) => a + b;
    const double = a => a * 2;
    return lib
      .flow({
        input: [1, 2],
        promise: [add, double]
      })
      .then(result => expect(result).toEqual(6));
  });
  it("should work", () => {
    const add = (a, b) => a + b;
    const double = a => a * 2;
    return lib
      .flow({
        input: [1, 2],
        promise: [add, double],
        output: 600
      })
      .then(result => expect(result).toEqual(600));
  });
  it("should work", () => {
    function add() {
      throw "FAIL";
    }
    const double = a => a * 2;
    const handleError = () => 600;
    return lib
      .flow({
        input: [1, 2],
        promise: [add, double],
        error: handleError
      })
      .then(result => expect(result).toEqual(600));
  });
  it("should work", () => {
    function double() {
      throw "FAIL";
    }
    const add = (a, b) => a + b;
    const handleError = () => 600;
    return lib
      .flow({
        input: [1, 2],
        promise: [add, double],
        error: handleError
      })
      .then(result => expect(result).toEqual(600));
  });
});
