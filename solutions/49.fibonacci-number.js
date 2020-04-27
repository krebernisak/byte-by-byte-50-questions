/**
 * 49. Fibonacci Number
 * Question: Given an integer n, write a function to compute the nth Fibonacci number.
 * Answer: https://www.byte-by-byte.com/fibonacci/
 * Tags: [Recursion][DP]
 */

// Top down recursive
const fibonacci_naive = (n) => {
  if (n <= 1) return n;
  return fibonacci_naive(n - 1) + fibonacci_naive(n - 2);
};

// Top down recursive with memoization
const fibonacci_topDown = (n) => {
  const memo = [0, 1];
  const _self = (k) => {
    if (k < memo.length) return memo[k];
    return (memo[k] = _self(k - 1) + _self(k - 2));
  };
  return _self(n);
};

// Bottom up
const fibonacci_bottomUp = (n) => {
  const memo = [0, 1];
  for (let i = 2; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  return memo[n];
};

// Bottom up conserve memory
const fibonacci_bottomUpOptimized = (n) => {
  let f1 = 0;
  let f2 = 1;
  while (n-- > 0) [f1, f2] = [f2, f1 + f2];
  return f1;
};

const tests = [
  [0, 0],
  [1, 1],
  [2, 1],
  [4, 3],
  [6, 8],
  [10, 55],
  [16, 987],
  [28, 317811],
];
const functions = [
  fibonacci_naive,
  fibonacci_topDown,
  fibonacci_bottomUp,
  fibonacci_bottomUpOptimized,
];

tests.forEach((v) => {
  functions.forEach((f) => {
    const res = f(v[0]);
    console.assert(
      res === v[1],
      `Function ${f.name} failed for [${v}] case [Expected: ${v[1]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
