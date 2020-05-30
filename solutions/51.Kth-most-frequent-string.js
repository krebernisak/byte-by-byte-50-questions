/**
 * 51. Kth Most Frequent String
 * Question: Given a list of strings, write a function to get the kth most
 *   frequently occurring string.
 * Answer: https://www.byte-by-byte.com/kthmostfrequentstring/
 * Tags: [Heap][Priority Queue]
 */

// O(n + n*log(n))
const kthMostFrequent_sort = (data, k = 0) => {
  const counters = {};
  data.forEach((v) => (counters[v] = counters[v] ? counters[v] + 1 : 1));
  const ordered = Object.entries(counters).sort((a, b) => b[1] - a[1]);
  return ordered.length <= k ? null : ordered[k][0];
};

// O(n + log(n))
const kthMostFrequent_heap = (data, k = 0) => {
  // TODO: solve using a heap
};

const tests = [
  [["a", "b", "c", "a", "b", "a"], 0, "a"],
  [["a", "b", "c", "a", "b", "a"], 1, "b"],
  [["a", "b", "c", "a", "b", "a"], 2, "c"],
  [["a", "b", "c", "a", "b", "a"], 3, null],
  [["a", "b", "c", "a", "b", "a"], 4, null],
  [["a", "b", "c", "a", "b", "a", "c", "c"], 0, "a"],
  [["a", "b", "c", "a", "b", "a", "c", "c", "c"], 0, "c"],
];
const functions = [kthMostFrequent_sort];

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
