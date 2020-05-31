/**
 * 32. Two Missing Numbers
 * Question: Given an array containing all the numbers from 1 to n except two, find the two missing numbers.
 * Answer: https://www.byte-by-byte.com/twomissingnumbers/
 * Tags: [Bitwise]
 */

/**
 * Solution:
 *   1. Both numbers are unique eg. 3 & 5, can not be 4 & 4
 *   2. We can get sum of missing numbers => sum of sequence - sum of data
 *   3. We know (as numbers are not equal) one number is < sum_missing/2, other > sum_missing/2
 *   4. Partition array around sum_missing/2 and solve 2x for one missing number (xor)
 */

const _sumSequence = (n) => (n * (n + 1)) / 2;
const _sumData = (data) => data.reduce((acc, val) => acc + val);

/**
 * Given an array containing all the numbers from 1 to n except two,
 * find the two missing numbers.
 * @param {number[]} data
 */
const missing_sum = (data) => {
  const n = data.length + 2;
  const sumData = _sumData(data);
  const sumAll = _sumSequence(n);
  const diff = sumAll - sumData;
  const splitter = Math.floor(diff / 2);
  const sumAllLeft = _sumSequence(splitter);
  const s1 = data
    .filter((val) => val <= splitter)
    .reduce((acc, val) => acc - val, sumAllLeft);
  const s2 = diff - s1;
  return [s1, s2];
};

/**
 * Given an array containing all the numbers from 1 to n except one,
 * find the one missing numbers.
 * @param {number[]} data
 */
const missingOne = (data) =>
  data.reduce((acc, val, i) => acc ^ val ^ (i + 1), data.length + 1);

assert(missingOne([1, 2, 3, 4, 6]) === 5);

/**
 * Given an array containing all the numbers from 1 to n except two,
 * find the two missing numbers.
 * @param {number[]} data
 */
const missing_xor = (data) => {
  const n = data.length + 2;
  const sumData = _sumData(data);
  const sumAll = _sumSequence(n);
  const diff = sumAll - sumData;
  const splitter = Math.floor(diff / 2);
  const s1 = missingOne(data.filter((val) => val <= splitter));
  const s2 = diff - s1;
  return [s1, s2];
};

// test helper
const test_missing = (f) => (data, expected) => {
  const output = f(data);
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
const functions = [test_missing(missing_sum), test_missing(missing_xor)];

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
