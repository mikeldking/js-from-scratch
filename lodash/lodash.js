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

function fill(arr, val, start = 0, end = arr.length) {
  for (let i = start; i < end; i++) {
    arr[i] = val;
  }
  return arr;
}

function findIndex(arr, predicate = identity) {
  predicate = normalizePredicate(predicate);
  return arr.findIndex(predicate);
}

function findLastIndex(arr, predicate = identity) {
  predicate = normalizePredicate(predicate);
  let index = -1;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i], i)) {
      index = i;
      return index;
    }
  }
  return index;
}

function head(arr) {
  if (arr.length) {
    return arr[0];
  }
}

function flatten(arr) {
  return arr.reduce((acc, v) => {
    if (Array.isArray(v)) {
      acc = [...acc, ...v];
    } else {
      acc.push(v);
    }
    return acc;
  }, []);
}

function flattenDeep(arr) {
  return arr.reduce((acc, v) => {
    if (Array.isArray(v)) {
      acc = [...acc, ...flattenDeep(v)];
    } else {
      acc.push(v);
    }
    return acc;
  }, []);
}

function flattenDepth(arr, depth = 1) {
  if (depth <= 0) {
    return arr;
  }
  return arr.reduce((acc, v) => {
    if (Array.isArray(v)) {
      acc = [...acc, ...flattenDepth(v, depth - 1)];
    } else {
      acc.push(v);
    }
    return acc;
  }, []);
}

function fromPairs(pairs) {
  return pairs.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
}

function indexOf(arr, value, fromIndex = 0) {
  for (var i = fromIndex; i < arr.length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }
  return -1;
}

function initial(arr) {
  return arr.slice(0, arr.length - 1);
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

//--- collection ---

function countBy(collection, iteratee = identity) {
  iteratee = normalizePredicate(iteratee);
  return collection.reduce((acc, val) => {
    const key = iteratee(val);
    acc[key] = acc[key] ? acc[key] + 1 : 1;
    return acc;
  }, {});
}

function every(collection, predicate = identity) {
  predicate = normalizePredicate(predicate);
  for (var i = 0; i < collection.length; i++) {
    const shouldBeTruthy = predicate(collection[i], i);
    if (!shouldBeTruthy) {
      return false;
    }
  }
  return true;
}

function filter(collection, predicate = identity) {
  return collection.filter(normalizePredicate(predicate));
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
  fill,
  head,
  findIndex,
  findLastIndex,
  flatten,
  flattenDeep,
  flattenDepth,
  fromPairs,
  indexOf,
  initial,
  // Collection
  countBy,
  every,
  filter,
  property,
  identity,
  isEqual,
};

module.exports = _;
