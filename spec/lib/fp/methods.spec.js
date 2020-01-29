const pathTo = x => require("../../../" + x);
const lib = pathTo("lib/fp/methods").lib;

describe("methods", () => {
  describe("methods", () => {
    let one, two, three, four;
    beforeEach(() => (one = x => x * 2));
    beforeEach(() => (two = (a, b) => a * b));
    beforeEach(() => (three = (a, b, c) => a * b * c));
    beforeEach(() => (four = (a, b, c, d) => a * b * c * d));

    it("should work with nothing", () => {
      const m = lib.methods();
      expect(m).toEqual({});
    });
    it("should work with an object", () => {
      const m = lib.methods({});
      expect(m).toEqual({});
    });
    it("should work with an object", () => {
      const m = lib.methods({
        normal: {
          one
        }
      });
      expect(Object.keys(m).sort()).toEqual(["one"]);
      expect(m.one(3)).toEqual(6);
    });
    it("should work with an object", () => {
      const m = lib.methods({
        normal: {
          one,
          two
        }
      });
      expect(Object.keys(m).sort()).toEqual(["one", "two"]);
      expect(m.one(3)).toEqual(6);
      expect(m.two(2, 3)).toEqual(6);
    });
    it("should work with an object", () => {
      const m = lib.methods({
        curry: {
          two
        }
      });
      expect(Object.keys(m).sort()).toEqual(["two"]);
      expect(m.two(2, 3)).toEqual(6);
      expect(m.two(2)(3)).toEqual(6);
    });
    it("should work with an object", () => {
      const m = lib.methods({
        curry: {
          two,
          three
        }
      });
      expect(Object.keys(m).sort()).toEqual(["three", "two"]);
      expect(m.two(2, 3)).toEqual(6);
      expect(m.two(2)(3)).toEqual(6);
      expect(m.three(2, 3, 4)).toEqual(24);
      expect(m.three(2)(3)(4)).toEqual(24);
    });
    it("should work with an object", () => {
      const m = lib.methods({
        curry: {
          two
        },
        normal: {
          one
        }
      });
      expect(Object.keys(m).sort()).toEqual(["one", "two"]);
      expect(m.one(3)).toEqual(6);
      expect(m.two(2, 3)).toEqual(6);
      expect(m.two(2)(3)).toEqual(6);
    });
    it("should work with an object", () => {
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
      expect(Object.keys(m).sort()).toEqual(["four", "one", "three", "two"]);
      expect(m.one(3)).toEqual(6);
      expect(m.two(2, 3)).toEqual(6);
      expect(m.two(2)(3)).toEqual(6);
      expect(m.three(2, 3, 4)).toEqual(24);
      expect(m.three(2)(3)(4)).toEqual(24);
      expect(m.four(2, 3, 4, 5)).toEqual(120);
    });
  }); // methods
});
