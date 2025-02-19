/**
 * 10. Merge Arrays
 * Question: Given 2 sorted arrays, A and B, where A is long enough to hold the
 *   contents of A and B, write a function to copy the contents of B into A without
 *   using any buffer or additional memory.
 * Answer: https://www.byte-by-byte.com/mergearrays/
 * Tags: [Array]
 */

/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 *
 * @param {number[]} a
 * @param {number[]} b
 */
const mergeArrays = (a, b) => {
  if (!b) return a;
  let i = a.length - 1;
  let j = b.length - 1;

  while (a[i] === 0) i--; // move pointer i to first data cell in a > 0
  const aDataLength = i + 1; // a data length
  const n = aDataLength + b.length; // all data length

  let p = a.length - 1; // copy pointer (starting from back)
  while (p-- > n); // extra (unneeded) space

  while (p >= 0) {
    if (i < 0) a[p--] = b[j--];
    else if (j < 0) a[p--] = a[i--];
    else if (a[i] > b[j]) a[p--] = a[i--];
    else a[p--] = b[j--];
  }
  return a;
};

const A = [1, 3, 5, 0, 0, 0, 0, 0, 0];
const B = [2, 4, 6];
const expected = [1, 2, 3, 4, 5, 6, 0, 0, 0];
assert(mergeArrays(A, B).toString() === expected.toString());
