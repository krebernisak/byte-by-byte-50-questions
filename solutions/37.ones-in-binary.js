// 37. Number of Ones in a Binary Number
// Question: Given an integer, write a function to compute the number of ones in the binary representation of the number.
// Answer: https://www.byte-by-byte.com/onesinbinary/
// [Bitwise]

const countOnesInBinary = (num) => {
  let count = 0;
  while (num !== 0) {
    count += num & 1;
    num = num >>> 1;
  }
  return count;
};

const tests = [
  [0, 0],
  [1, 1],
  [2, 1],
  [3, 2],
  [-1, 32],
  [-2, 31],
  [-3, 31],
  [-4, 30],
  [1 << 31, 1],
  [(1 << 31) - 1, 31],
];
const functions = [countOnesInBinary];

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
