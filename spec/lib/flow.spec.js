const pathTo = x => require("../../" + x);
const lib = pathTo("lib/flow").lib;

describe("flow", () => {
  it("should work", () => {
    expect(lib.flow()).toEqual(null);
  });
});
