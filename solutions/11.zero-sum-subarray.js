/**
 * 11. Zero Sum Subarray
 * Question: Given an array, write a function to find any subarray that sums to zero,
 *   if one exists.
 * Answer: https://www.byte-by-byte.com/zerosum/
 * Tags: [Array]
 * Keywords: Slope, Sum Diff, Graph of price
 */

const _cumulativeSum = (sum) => (value) => (sum += value);

/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 *
 * @param {number[]} data
 */
const findSum = (data, target) => {
  // Track movements in sum, find target difference in elevation
  const runningSum = data.map(_cumulativeSum(0));

  const i = new Map();
  for (let j = 0; j < runningSum.length; j++) {
    const sum = runningSum[j] - target;
    if (i.has(sum)) return data.slice(i.get(sum) + 1, j + 1);
    else i.set(runningSum[j], j);
  }

  return [];
};

const zeroSum = (data) => findSum(data, 0);

const tests = [
  [[1, 2, -5, 1, 2, -1], 0, [2, -5, 1, 2]],
  [[5, 4, 3, 9, 7, 2, 4, 6, 7, 8, -3], 16, [4, 3, 9]],
  [[5, 4, 3, 9, 7, 2, 4, 61, 7, 8], 12, [3, 9]],
  [[5, 4, 3, 9, 7, 2, 4, 61, 7, 8], 7, [4, 3]],
];
const test_sum = (fn) => (data, target, expected) =>
  fn(data, target).toString() === expected.toString();
const functions = [test_sum(findSum)];

tests.forEach((v) => {
  functions.forEach((f) => {
    const res = f(...v);
    console.assert(
      res === true,
      `Function ${f.name} failed for [${v}] case [Expected: ${v[2]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
