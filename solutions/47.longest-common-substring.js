// 47. Longest Common Substring
// Question: Given two strings, write a function that returns the longest common substring.
// Answer: https://www.byte-by-byte.com/longestsubstring/
// [Recursion][DP]
// Leetcode similar:
//   https://leetcode.com/problems/maximum-length-of-repeated-subarray/
//   https://leetcode.com/problems/longest-common-subsequence/

// Easy to find length, but harder to find longest substring using top down approach
const longestSubstring_TopDown = (a, b) => {};

const longestSubstring_BottomUp = (a, b) => {
  if (!a || !b) return "";
  if (a === b) return a;

  const cache = Array(a.length + 1)
    .fill()
    .map((_) => Array(b.length + 1).fill(0));

  let out = "";
  let maxLength = 0;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) cache[i][j] = 1 + cache[i - 1][j - 1];
      else
        cache[i][j] = Math.max(
          cache[i - 1][j],
          cache[i][j - 1],
          cache[i - 1][j - 1]
        );
      if (cache[i][j] > maxLength) {
        maxLength = cache[i][j];
        out = a.substring(i - maxLength + 1, i + 1);
      }
    }
  }

  return out;
};

//  ''  A  B  A  B
//''[0, 0, 0, 0, 0]
// B[0, 0, 1, 1, 1]
// A[0, 1, 1, 2, 2]
// B[0, 1, 2, 2, 3]
// A[0, 1, 2, 3, 3]
//               ^ RESULT

const tests = [
  ["", "", ""],
  ["ABAB", "BABA", "BAB"],
  ["ABABAA", "BABAABA", "BABAA"],
];
const functions = [longestSubstring_BottomUp];

tests.forEach((v) => {
  functions.forEach((f) => {
    const res = f(v[0], v[1]);
    console.assert(
      res === v[2],
      `Function ${f.name} failed for [${v}] case [Expected: ${v[2]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
