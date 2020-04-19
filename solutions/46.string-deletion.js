// 46. String Deletion
// Question: Given a string and a dictionary HashSet,
//   write a function to determine the minimum number of characters to delete to make a word.
// https://www.byte-by-byte.com/stringdeletion/
// [Graph][BFS]

const stringDeletion = (dictionary, query) => {
  if (!query) return 0;

  const removeCharAt = (s, i) => s.substring(0, i) + s.substring(i + 1);

  const queue = [query];
  const queueSet = new Set();
  // Process jobs from queue
  while (queue.length > 0) {
    const candidate = queue.shift();
    if (dictionary.has(candidate)) return query.length - candidate.length;

    // Remove character at every index and add to queue (if not already added)
    for (let i = 0; i < candidate.length; i++) {
      let nextCandidate = removeCharAt(candidate, i);
      if (queueSet.has(nextCandidate)) continue;
      queue.push(nextCandidate);
      queueSet.add(nextCandidate);
    }
  }
  return -1;
};

const tests = [
  [[], "", 0],
  [[], "abc", -1],
  [["a", "aa", "aaa"], "abc", 2],
  [["a", "aa", "aaa"], "abca", 2],
  [["a", "aa", "aaa"], "abcaa", 2],
  [["a", "aa", "aaa"], "abbc", 3],
  [["a", "aa", "aaa"], "bc", -1],
  [["a", "aa", "aaa"], "bcababab", 5],
  [["a", "aa", "aaa"], "bcabababb", 6],
];

// test helper
const test = (fn) => {
  return (data, q, expected) => {
    let dictionary = new Set(data);
    let result = fn(dictionary, q);
    return expected === result;
  };
};

const functions = [test(stringDeletion)];

tests.forEach((v) => {
  functions.forEach((f) => {
    const res = f(v[0], v[1], v[2]);
    console.assert(
      res,
      `Function ${f.name} failed for [${v}] case [Expected: ${v[1]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
