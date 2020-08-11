const _ = require("./lodash.js");

describe("lodash", () => {
  it("should handle chunk", () => {
    expect(_.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(_.chunk([1, 2, 3, 4, 5], 3)).toEqual([
      [1, 2, 3],
      [4, 5],
    ]);
    expect(_.chunk(["a", "b", "c", "d"], 3)).toEqual([["a", "b", "c"], ["d"]]);
  });
  it("should handle compact", () => {
    _.compact([0, 1, false, 2, "", 3], [1, 2, 3]);
  });
  it("should handle concat", () => {
    var array = [1];
    var other = _.concat(array, 2, [3], [[4]]);

    expect(other).toEqual([1, 2, 3, [4]]);

    expect(array).toEqual([1]);
  });
});
