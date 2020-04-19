// 32. Two Missing Numbers
// https://www.byte-by-byte.com/twomissingnumbers/
// [Bitwise]

/**
 * Given an array containing all the numbers from 1 to n except two,
 * find the two missing numbers.
 * @param {number[]} data
 */
const missing = (data) => {
  const n = data.length + 2;
  const sumData = data.reduce((acc, val) => acc + val);
  const sumAll = (n * (n + 1)) / 2;
  const diff = sumAll - sumData;
  const splitter = Math.floor(diff / 2);
  const sumAllLeft = (splitter * (splitter + 1)) / 2;
  const s1 = data
    .filter((val) => val <= splitter)
    .reduce((acc, val) => acc - val, sumAllLeft);
  return [s1, diff - s1];
};

// test helper
const test_missing = (data, expected) => {
  const output = missing(data);
  if (expected[0] !== output[0]) return output;
  if (expected[1] !== output[1]) return output;
  return true;
};

const tests = [
  [
    [4, 2, 3],
    [1, 5],
  ],
  [
    [4, 2, 3, 5],
    [1, 6],
  ],
  [
    [4, 2, 3, 1],
    [5, 6],
  ],
];
const functions = [test_missing];

tests.forEach((v) => {
  functions.forEach((f) => {
    const res = f(v[0], v[1]);
    console.assert(
      res === true,
      `Function ${f.name} failed for [${v}] case [Expected: ${v[1]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
