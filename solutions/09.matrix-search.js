/**
 * 9. Matrix Search
 * Question: Given an n x m array where all rows and columns are in sorted order,
 *   write a function to determine whether the array contains an element x.
 * Answer: https://www.byte-by-byte.com/matrixsearch/
 * Tags: [Binary Search]
 */

/**
 * Time complexity: O(log n)
 *
 * @param {function} getData
 * @param {number} low
 * @param {number} high
 * @param {number} val
 */
const _binarySearch = (getData, low, high, val) => {
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    const midVal = getData(mid);
    if (midVal === val) return mid;
    else if (midVal > val) high = mid - 1;
    else low = mid + 1;
  }
  return -1;
};

/**
 * Time complexity: O(log(n * m))
 *
 * This will not work if numbers are not in total order,
 * but still sorted by challenge definition -> all rows and columns are in sorted order.
 *
 * Imagine the following:
 *   [1, 10, 100]
 *   [2, 11, 101]
 *   [3, 12, 102]
 *
 * Then we need to do binary search by row first, and than by column (or vice versa).
 *
 * @param {number[][]} data - 2D matrix
 * @param {number} val - value to search for
 */
const matrixSearch_binarySearch = (data, val) => {
  const n = data.length;
  const m = data[0].length;
  // Function that maps from 1D index to 2D indexes
  const getData = (index) => {
    const i = Math.floor(index / m);
    const j = index % m;
    assert(index === i * m + j); // Example for going back 2D => 1D
    return data[i][j];
  };
  return _binarySearch(getData, 0, n * m - 1, val) >= 0;
};

/**
 * Solution by Sam Gavis-Hughson
 *
 * Time complexity: O(n + m)
 *
 * @param {number[][]} data - 2D matrix
 * @param {number} val - value to search for
 */
const matrixSearch_scanRowCol = (data, val) => {
  if (data.length == 0 || data[0].length == 0) return false;
  let row = 0;
  let col = data[0].length - 1;

  while (row < data.length && col >= 0) {
    if (data[row][col] === val) return true;
    if (data[row][col] < val) row++;
    else col--;
  }

  return false;
};

const matrix = [
  [-10, -8, -6, -4, -3, -2],
  [1, 2, 3, 4, 5, 6],
  [6, 6, 6, 6, 6, 7],
  [8, 9, 13, 17, 18, 19],
  [19, 20, 200, 217, 218, 319],
];

const tests = [
  [matrix, -10, true],
  [matrix, -4, true],
  [matrix, 0, false],
  [matrix, -1, false],
  [matrix, -8, true],
  [matrix, 4, true],
  [matrix, 6, true],
  [matrix, 19, true],
  [matrix, 319, true],
];

// test helper
const test_found = (fn) => {
  return (data, val, expected) => {
    const res = fn(data, val);
    return expected === res;
  };
};
const functions = [
  test_found(matrixSearch_binarySearch),
  test_found(matrixSearch_scanRowCol),
];

tests.forEach((v, i) => {
  functions.forEach((f) => {
    const res = f(...v);
    console.assert(
      res === true,
      `Function ${f.name} failed for [${v}] case [Expected: ${v[2]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
