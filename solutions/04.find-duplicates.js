// 4. Find Duplicates
// Question: Given an array of integers where each value 1 <= x <= len(array), write
//   a function that finds all the duplicates in the array.
// Answer: https://www.byte-by-byte.com/findduplicates/
// Tags: [Array]

const naturalOrder = (a, b) => a - b;
const onlyDuplicates = (val, i, arr) => i !== 0 && val === arr[i - 1];
const onlyDistinct = (val, i, arr) => i === 0 || val !== arr[i - 1];

const findDuplicates_Set = (data) => {
  if (!data || data.length === 1) return [];
  const numberSet = new Set();
  return data
    .filter((val) => {
      if (numberSet.has(val)) return true;
      else {
        numberSet.add(val);
        return false;
      }
    }) // find duplicatess
    .filter(onlyDistinct) // remove duplicates from duplicates
    .sort(naturalOrder);
};

const findDuplicates_Sort = (data) => {
  if (!data || data.length === 1) return [];
  return data
    .sort(naturalOrder)
    .filter(onlyDuplicates) // find duplicates
    .filter(onlyDistinct); // remove duplicates from duplicates
};

const findDuplicates_Encode = (data) => {
  let duplicates = [];
  if (!data || data.length === 1) return duplicates;

  const indexFor = (val) => val - 1;
  const markSeen = (val) => (data[indexFor(val)] *= -1);
  const isSeen = (val) => data[indexFor(val)] < 0;

  data.forEach((val) => {
    if (!isSeen(val)) markSeen(val);
  });

  return data
    .filter((val, i) => {
      const isDuplicate = val > 0;
      // cleanup
      data[i] = Math.abs(data[i]);
      return isDuplicate;
    })
    .filter(onlyDistinct) // remove duplicates from duplicates
    .sort(naturalOrder);
};

const tests = [
  [[[1, 2, 3]], []],
  [[1, 2, 2], [2]],
  [[3, 3, 3], [3]],
  [
    [2, 1, 2, 1],
    [1, 2],
  ],
];

// test helper
const test = (fn) => (data, expected) => {
  return fn([...data]).toString() === expected.toString();
};

const functions = [
  test(findDuplicates_Sort),
  test(findDuplicates_Set),
  test(findDuplicates_Encode),
];

tests.forEach((v) => {
  functions.forEach((f) => {
    const res = f(...v);
    console.assert(
      res === true,
      `Function ${f.name} failed for [${v}] case [Expected: ${v[1]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
