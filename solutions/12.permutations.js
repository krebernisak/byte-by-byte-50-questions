// 12. Permutations
// Question: Write a function that returns all permutations of a given list.
// Answer: https://www.byte-by-byte.com/permutations/
// Tags: [Recursion][Ordering][Permutations]

/**
 * @param {string} data
 * @return {string[]}
 */
const permutations_string = (str) => {
  if (typeof str !== "string") throw Error("Please enter a str");
  if (!str || str.length < 2) return str;

  const res = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    const remainingChars = str.slice(0, i) + str.slice(i + 1, str.length);

    for (let permutation of permutations_string(remainingChars))
      res.push(char + permutation);
  }
  return res;
};

/**
 * @param {number[]} data
 * @return {number[][]}
 */
const permutations = (data) => {
  const res = [];
  const _self = (path) => {
    if (path.length === data.length) {
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

// n! permutations =>    [ ]
//       [1]             [2]             [3]
//   [1,2] [1,3]     [2,1] [2,3]     [3,1] [3,2]
// [1,2,3] [1,3,2] [2,1,3] [2,3,1] [3,1,2] [3,2,1]

// This code does not work when there are duplicates
// assert(permutations([1, 2, 3, 3]).length !== 0);
