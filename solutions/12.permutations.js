// 12. Permutations
// Question: Write a function that returns all permutations of a given list.
// Answer: https://www.byte-by-byte.com/permutations/
// Tags: [Recursion][Ordering][Permutations]

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
