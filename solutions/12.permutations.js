/**
 * 12. Permutations
 * Question: Write a function that returns all permutations of a given list.
 * Answer: https://www.byte-by-byte.com/permutations/
 * Tags: [Recursion][Ordering][Permutations]
 */

/**
 * Generate all permutations of a input string
 *
 * Time complexity: O(n! / (n - k)!)
 *
 * @param {string} str text input that will be permuted
 * @return {string[]}
 */
const permutations_string = (str) => {
  if (typeof str !== "string") throw Error("Please enter a str");
  if (!str || str.length < 2) return str;

  const res = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    // skip repeating characters
    if (str.indexOf(char) !== i) continue;

    const remainingChars = str.slice(0, i) + str.slice(i + 1, str.length);
    permutations_string(remainingChars).forEach((p) => res.push(char + p));
  }
  return res;
};

/**
 * Time complexity: O(n! / (n - k)!)
 *
 * @param {number[]} data
 * @return {number[][]}
 */
const permutations = (data, k = data.length) => {
  const res = [];
  const _self = (path) => {
    if (path.length === k) {
      res.push([...path]);
      return;
    }

    data.forEach((val) => {
      if (!path.includes(val)) {
        path.push(val);
        _self(path);
        path.pop();
      }
    });
  };
  _self([]);
  return res;
};

assert(permutations([1, 2, 3]).length === 6); // 3!
assert(permutations([1, 2, 3], 3).length === 6); // 3!
assert(permutations([1, 2, 3], 2).length === 6); // 3!
assert(permutations([1, 2, 3], 1).length === 3); // 3! / 2!

// n! permutations =>    [ ]
//       [1]             [2]             [3]
//   [1,2] [1,3]     [2,1] [2,3]     [3,1] [3,2]
// [1,2,3] [1,3,2] [2,1,3] [2,3,1] [3,1,2] [3,2,1]

// This code does not work when there are duplicates
// assert(permutations([1, 2, 3, 3]).length !== 0);
