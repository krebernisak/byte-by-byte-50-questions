// 47. Longest Common Substring
// Question: Given two strings, write a function that returns the longest common substring.
// Answer: https://www.byte-by-byte.com/longestsubstring/
// [Recursion][DP]
// Leetcode similar:
//   https://leetcode.com/problems/maximum-length-of-repeated-subarray/
//   https://leetcode.com/problems/longest-common-subsequence/

const longestSubstring_TopDown = (a, b) => {
  if (!a || !b) return "";

  const _longestSubstring = (i, j) => {
    if (i === 0 || j === 0) return "";
  };

  return _longestSubstring(a.length, b.length);
};

const longestSubstring_BottomUp = (a, b) => {};

const tests = [
  ["", "", ""],
  ["ABAB", "BABA", "ABA"],
];
const functions = [longestSubstring_TopDown, longestSubstring_BottomUp];

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
