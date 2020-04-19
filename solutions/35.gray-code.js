// 35. Gray Code
// Question: Given two integers, write a function to determine
//   whether or not their binary representations differ by a single bit.
// Answer: https://www.byte-by-byte.com/graycode/
// Tags: [Bitwise]
// History and applications: https://en.wikipedia.org/wiki/Gray_code

const grayCode_Count = (a, b) => countBits(a ^ b) === 1;

const countBits = (num) => {
  let count = 0;
  while (num !== 0) {
    count += num & 1;
    num = num >>> 1;
  }
  return count;
};

const grayCode_EraseLowest = (a, b) => {
  const diff = a ^ b;
  return diff > 0 && (diff & (diff - 1)) === 0; // erase lowest bit
};

const tests = [
  [0, 0, false],
  [1, 2, false],
  [2, 1, false],
  [1, 0, true],
  [0b1010, 0b1010, false],
  [0b1010, 0b1000, true],
  [0b1010, 0b1110, true],
];
const functions = [grayCode_Count, grayCode_EraseLowest];

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
