const pathTo = x => require("../../../" + x);
const lib = pathTo("lib/immutable/get").lib;

describe("get", () => {
  let object, value, defaultValue;
  beforeEach(() => (object = {}));
  beforeEach(() => (value = 1));
  beforeEach(() => (defaultValue = 1024));
});
