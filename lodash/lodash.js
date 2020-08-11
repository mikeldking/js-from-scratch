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
  return differenceBy(arr, secondArr, identity);
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

function normalizePredicate(predicate) {
  if (Array.isArray(predicate)) {
    predicate = matchesProperty(predicate);
  } else if (typeof predicate === "object") {
    predicate = matches(predicate);
  } else if (typeof predicate === "string") {
    predicate = property(predicate);
  }
  return predicate;
}

function dropRightWhile(arr, predicate = identity) {
  let res = Array.from(arr);
  predicate = normalizePredicate(predicate);
  while (res.length && predicate(res[res.length - 1])) {
    res.pop();
  }
  return res;
}

function dropWhile(arr, predicate = identity) {
  return dropRightWhile(Array.from(arr).reverse(), predicate).reverse();
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

const matches = (obj1) => (obj2) => {
  return !Object.keys(obj1).some((key) => {
    return obj1[key] !== obj2[key];
  });
};

const matchesProperty = (tuple) => (obj) => {
  return obj[tuple[0]] === tuple[1];
};

const property = (str) => (obj) => {
  return obj[str];
};

function identity(x) {
  return x;
}

const _ = {
  chunk,
  compact,
  concat,
  difference,
  differenceBy,
  differenceWith,
  drop,
  dropRight,
  dropRightWhile,
  dropWhile,
  property,
  identity,
  isEqual,
};

module.exports = _;
