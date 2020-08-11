function chunk(arr, size = 1) {
  let index = 0;
  const res = [];
  while (index < arr.length) {
    let _chunk = [];
    for (let i = 0; i < size && i + index < arr.length; i++) {
      _chunk.push(arr[index + i]);
    }
    res.push(_chunk);
    index += size;
  }
  return res;
}

function compact(arr) {
  return arr.filter((x) => !x);
}

function concat(arr, ...values) {
  return [
    ...arr,
    ...values.reduce((acc, x) => {
      if (Array.isArray(x)) {
        return [...acc, ...x];
      }
      acc.push(x);
      return acc;
    }, []),
  ];
}

function difference(arr, secondArr) {
  return differenceBy(arr, secondArr, (x) => x);
}

function differenceBy(arr, secondArr, iterator) {
  let iter = iterator;
  if (typeof iterator === "string") {
    iter = (x) => x[iterator];
  }
  const map = secondArr.reduce((acc, val) => {
    acc[iter(val)] = true;
    return acc;
  }, {});
  return arr.filter((x) => !map[iter(x)]);
}

function differenceWith(arr, secondArr, compare) {
  return arr.filter((x) => {
    return !secondArr.some((y) => {
      return compare(x, y);
    });
  });
}

function drop(arr, count = 1) {
  return arr.slice(count);
}
function dropRight(arr, count = 1) {
  return arr.slice(0, Math.max(0, arr.length - count));
}
function isEqual(x, y) {
  if (typeof x === "object" && typeof y === "object") {
    const xKeys = Object.keys(x);
    const yKeys = Object.keys(y);
    return (
      xKeys.length === yKeys.length &&
      !xKeys.some((xKey) => {
        return !isEqual(x[xKey], y[xKey]);
      })
    );
  }
  return x === y;
}

module.exports = {
  chunk,
  compact,
  concat,
  difference,
  differenceBy,
  differenceWith,
  drop,
  dropRight,
  isEqual,
};
