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

module.exports = {
  chunk,
  compact,
  concat,
};
