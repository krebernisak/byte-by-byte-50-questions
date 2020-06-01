/**
 * 47. Longest Common Substring
 * Question: Given two strings, write a function that returns the longest common substring.
 * Answer: https://www.byte-by-byte.com/longestsubstring/
 * Tags: [Recursion][DP]
 * LeetCode similar:
 *   - https://leetcode.com/problems/maximum-length-of-repeated-subarray/
 *   - https://leetcode.com/problems/longest-common-subsequence/
 */

// Easy to find length, but harder to find longest substring using top down approach
const longestSubstring_TopDown = (a, b) => {};

const longestSubstring_BottomUp = (a, b) => {
  if (!a || !b) return "";
  if (a === b) return a;

  const cache = Array(a.length)
    .fill()
    .map((_) => Array(b.length).fill(0));

  let out = "";
  let maxLength = 0;
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      if (a[i] !== b[j]) continue;
      if (i === 0 || j === 0) cache[i][j] = 1;
      else cache[i][j] = 1 + cache[i - 1][j - 1];
      // Check max substring
      if (cache[i][j] > maxLength) {
        maxLength = cache[i][j];
        out = a.substring(i - maxLength + 1, i + 1);
      }
    }
  }
  return out;
};

//   A  B  A  B
// B[0, 1, 0, 1]
// A[1, 0, 2, 0]
// B[0, 2, 0, 3]
// A[1, 0, 3, 0]

const tests = [
  ["", "", ""],
  ["AB", "A", "A"],
  ["ABAB", "BABA", "ABA"],
  ["ABABAAA", "BABAABA", "BABAA"],
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
