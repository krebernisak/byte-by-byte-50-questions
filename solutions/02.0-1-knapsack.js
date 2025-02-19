/**
 * 2. 0-1 Knapsack
 * Question: Given a list of items with values and weights, as well as a max weight,
 *   find the maximum value you can generate from items where the sum of the
 *   weights is less than the max.
 * Answer: https://www.byte-by-byte.com/01knapsack/
 * Tags: [Recursion][Ordering][Combinations][DP]
 * Links:
 *   - https://www.educative.io/courses/grokking-dynamic-programming-patterns-for-coding-interviews/RM1BDv71V60
 */

// First find all combinations and then filter on those
const knapsack_Combinations = (items, maxWeight) => {
  if (!items) return 0;
  if (maxWeight === 0) return 0;

  const allCombinations = [];

  const _combinations = (i, path) => {
    if (i === items.length) {
      allCombinations.push(path);
      return;
    }

    // Find all combinations that EXCLUDE the current item
    _combinations(i + 1, path);
    // Find all combinations that INCLUDE the current item
    _combinations(i + 1, [...path, items[i]]);
  };

  // Find all combinations
  _combinations(0, []);

  const _weightSum = (items) => items.reduce((acc, item) => acc + item[0], 0);
  const _valueSum = (items) => items.reduce((acc, item) => acc + item[1], 0);
  const _underMaxWeight = (items) => _weightSum(items) <= maxWeight;
  const _max = (a, b) => Math.max(a, b);

  return allCombinations
    .filter(_underMaxWeight) // only valid
    .map(_valueSum) // with total value
    .reduce(_max); // only max
};

// Recursively check every combination of items by traversing list of items
// and either including or excluding each item. Uses a cache to improve performance.
const knapsack_TopDown = (items, maxWeight) => {
  if (!items) return 0;
  if (maxWeight === 0) return 0;

  // we need to sort the data by value ASC for top down solution
  // must give custom comparator because JS default is a lexicographical sort
  // (e.g. convert objects to strings, and sort them in dictionary order)
  items.sort((a, b) => a[1] - b[1]);
  const cache = {};

  const _knapsack = (weight, i, value) => {
    if (weight === 0 || i < 0) return value;

    // memoization is sparse {}
    if (!cache[i]) cache[i] = {};
    if (cache[i][weight]) return cache[i][weight];

    const [iWeight, iValue] = items[i];
    if (weight - iWeight < 0)
      return (cache[i][weight] = _knapsack(weight, i - 1, value));

    const valueIfTaken = _knapsack(weight - iWeight, i - 1, value + iValue);
    const valueIfNotTaken = _knapsack(weight, i - 1, value);
    return (cache[i][weight] = Math.max(valueIfTaken, valueIfNotTaken));
  };

  return _knapsack(maxWeight, items.length - 1, 0);
};

// Iterative dynamic programming solution
const knapsack_BottomUp = (items, maxWeight) => {
  if (!items) return 0;
  if (maxWeight === 0) return 0;

  // NO need to sort the data ASC for bottom up solution

  // cache[i][j] = max value for the first i items with a max weight of j
  const cache = Array(items.length + 1)
    .fill(0)
    .map(() => Array(maxWeight + 1).fill(0));

  for (let i = 1; i <= items.length; i++) {
    for (let j = 0; j <= maxWeight; j++) {
      const [iWeight, iValue] = items[i - 1];
      // If including item[i-1] would exceed max weight j, don't
      // include the item. Otherwise take the max value of including
      // or excluding the item
      if (iWeight > j) cache[i][j] = cache[i - 1][j];
      else
        cache[i][j] = Math.max(
          (cache[i - 1][j - iWeight] || 0) + iValue, // take item
          cache[i - 1][j] // do NOT take item
        );
    }
  }

  return cache[items.length][maxWeight];
};

const tests = [
  [null, 5, 0],
  [[], 1, 0],
  [
    [
      [1, 6],
      [2, 10],
      [3, 12],
    ],
    5,
    22,
  ],
  [
    [
      [3, 12],
      [1, 6],
      [2, 10],
    ],
    5,
    22,
  ],
  [
    [
      [1, 6],
      [1, 3],
      [2, 10],
      [2, 12],
      [3, 13],
      [3, 12],
    ],
    5,
    28,
  ],
  [
    [
      [3, 12],
      [1, 6],
      [2, 10],
      [1, 3],
      [3, 13],
      [2, 12],
    ],
    5,
    28,
  ],
];

// test helper
const test = (fn) => {
  return (data, expected) => {
    const node = Node.from(data);
    const result = fn(node);
    return expected.toString() === result.toString();
  };
};

const functions = [knapsack_Combinations, knapsack_TopDown, knapsack_BottomUp];

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
