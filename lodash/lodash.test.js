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
  it("should handle difference", () => {
    expect(_.difference([2, 1], [2, 3])).toEqual([1]);
  });

  it("should handle differenceBy", () => {
    expect(_.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([1.2]);

    // The `_.property` iteratee shorthand.
    expect(_.differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], "x")).toEqual([
      { x: 2 },
    ]);
    // => [{ 'x': 2 }]
  });
  it("should implement differenceWith", () => {
    var objects = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];

    _.differenceWith(objects, [{ x: 1, y: 2 }], _.isEqual);
    // => [{ 'x': 2, 'y': 1 }]
  });
  it("should implement drop", () => {
    expect(_.drop([1, 2, 3])).toEqual([2, 3]);
    // => [2, 3]

    expect(_.drop([1, 2, 3], 2)).toEqual([3]);
    // => [3]

    expect(_.drop([1, 2, 3], 5)).toEqual([]);
    // => []

    expect(_.drop([1, 2, 3], 0)).toEqual([1, 2, 3]);
    // => [1, 2, 3]
  });
  it("should implement isEqual", () => {
    var object = { a: 1 };
    var other = { a: 1 };

    expect(_.isEqual(object, other)).toBe(true);
    // => true
  });
  it("should implement dropRight", () => {
    expect(_.dropRight([1, 2, 3])).toEqual([1, 2]);
    expect(_.dropRight([1, 2, 3], 2)).toEqual([1]);
    expect(_.dropRight([1, 2, 3], 5)).toEqual([]);
    expect(_.dropRight([1, 2, 3], 0)).toEqual([1, 2, 3]);
  });
  it("should implement dropRightWhile", () => {
    var users = [
      { user: "barney", active: true },
      { user: "fred", active: false },
      { user: "pebbles", active: false },
    ];

    expect(
      _.dropRightWhile(users, function (o) {
        return !o.active;
      })
    ).toEqual([{ user: "barney", active: true }]);
    // => objects for ['barney']

    // The `_.matches` iteratee shorthand.
    expect(_.dropRightWhile(users, { user: "pebbles", active: false })).toEqual(
      [
        { user: "barney", active: true },
        { user: "fred", active: false },
      ]
    );

    // The `_.matchesProperty` iteratee shorthand.
    expect(_.dropRightWhile(users, ["active", false])).toEqual([
      { user: "barney", active: true },
    ]);

    // The `_.property` iteratee shorthand.
    expect(_.dropRightWhile(users, "active")).toEqual([
      { user: "barney", active: true },
      { user: "fred", active: false },
      { user: "pebbles", active: false },
    ]);
  });
  it("should implement dropWhile", () => {
    var users = [
      { user: "barney", active: false },
      { user: "fred", active: false },
      { user: "pebbles", active: true },
    ];

    expect(
      _.dropWhile(users, function (o) {
        return !o.active;
      })
    ).toEqual([{ user: "pebbles", active: true }]);
    // => objects for ['pebbles']

    // The `_.matches` iteratee shorthand.
    expect(_.dropWhile(users, { user: "barney", active: false })).toEqual([
      { user: "fred", active: false },
      { user: "pebbles", active: true },
    ]);
    // => objects for ['fred', 'pebbles']

    // The `_.matchesProperty` iteratee shorthand.
    expect(_.dropWhile(users, ["active", false])).toEqual([
      { user: "pebbles", active: true },
    ]);
    // => objects for ['pebbles']

    // The `_.property` iteratee shorthand.
    expect(_.dropWhile(users, "active")).toEqual([
      { user: "barney", active: false },
      { user: "fred", active: false },
      { user: "pebbles", active: true },
    ]);
    // => objects for ['barney', 'fred', 'pebbles']
  });
});
