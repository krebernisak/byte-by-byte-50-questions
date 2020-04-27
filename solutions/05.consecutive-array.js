/**
 * 5. Consecutive Array
 * Question: Given an unsorted array, find the length of the longest sequence of
 *   consecutive numbers in the array.
 * Answer: https://www.byte-by-byte.com/consecutivearray/
 *  Tags: [Array]
 */

/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 *
 * @param {number[]} data
 */
const consecutive = (data) => {
  const dataSet = new Set(data);

  let maxLength = 0;
  for (let el of data) {
    // skip if not start of the sequence
    if (dataSet.has(el - 1)) continue;

    let count = 1;
    while (dataSet.has(el + count)) count++;
    maxLength = Math.max(maxLength, count);
  }
  return maxLength;
};

assert(consecutive([4, 2, 1, 6, 5]) === 3);
assert(consecutive([5, 5, 3, 1]) === 1);
assert(consecutive([5, 5, 3, 1, 2, 7, 4]) === 5);
