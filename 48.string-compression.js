// 48. String Compression
// https://www.byte-by-byte.com/stringcompression/

const compress = s => {
  if (!s) return s;
  let result = "";
  let count = 1;
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] === s[i + 1]) count++;
    else {
      result += `${s[i]}${count}`;
      count = 1;
    }
  }
  result += `${s[s.length - 1]}${count}`;
  return s.length <= result.length ? s : result;
};

const tests = [
  ["", ""],
  ["a", "a"],
  ["aa", "aa"],
  ["aaa", "a3"],
  ["abc", "abc"],
  ["aaabccd", "aaabccd"],
  ["aaabccddddd", "a3b1c2d5"]
];
const functions = [compress];

tests.forEach(v => {
  functions.forEach(f => {
    const res = f(v[0]);
    console.assert(
      res === v[1],
      `Function ${f.name} failed for [${v}] case [Expected: ${
        v[1]
      }, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
