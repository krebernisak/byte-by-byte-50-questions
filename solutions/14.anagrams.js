// 14. Anagrams
// https://www.byte-by-byte.com/anagrams/
// [Array]

// Slow O(n*log(n)) time & O(n) space
const isAnagram1 = (s1, s2) => {
  s1 = s1.toLowerCase().split("").sort().join("");
  s2 = s2.toLowerCase().split("").sort().join("");
  return s1 === s2;
};

// Fast O(n) time & O(n) space
const isAnagram2 = (s1, s2) => {
  const counters = new Array(128).fill(0);
  s1 = s1.toLowerCase();
  for (let i = 0; i < s1.length; i++) counters[s1.charCodeAt(i)]++;
  s2 = s2.toLowerCase();
  for (let i = 0; i < s2.length; i++) counters[s2.charCodeAt(i)]--;
  return counters.filter((v) => v !== 0).length === 0;
};

const tests = [
  ["", "", true],
  ["A", "A", true],
  ["A", "B", false],
  ["ab", "ba", true],
  ["AB", "ab", true],
  ["Listen", "Silent", true],
  ["A gentleman", "Elegant man", true],
  ["Fish", "Plenty", false],
  ["The eyes", "They see", true],
];
const functions = [isAnagram1, isAnagram2];

tests.forEach((v, i) => {
  functions.forEach((f) => {
    const res = f(v[0], v[1]);
    console.assert(
      res === v[2],
      `Function ${f.name} failed for [${v}] case [Expected: ${v[2]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
