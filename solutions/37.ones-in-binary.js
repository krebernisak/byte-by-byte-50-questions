/**
 * 37. Number of Ones in a Binary Number
 * Question: Given an integer, write a function to compute the number of ones in the binary representation of the number.
 * Answer: https://www.byte-by-byte.com/onesinbinary/
 * Tags: [Bitwise]
 */

const countOnesInBinary_recursion = (num) =>
  // if last bit set add 1 else add 0
  num === 0 ? 0 : (num & 1) + countOnesInBinary_recursion(num >>> 1);

const countOnesInBinary_iteration = (num) => {
  let count = 0;
  while (num !== 0) {
    count += num & 1;
    num = num >>> 1;
  }
  return count;
};

/**
 * Brian Kernighan’s Algorithm:
 *
 * Subtracting 1 from a decimal number flips all the bits after the rightmost set bit (which is 1) including the rightmost set bit.
 *
 * Example:
 *   10 = 0b00001010
 *   9  = 0b00001001
 *   8  = 0b00001000
 *   7  = 0b00000111
 *
 * So if we subtract a number by 1 and do bitwise & with itself (n & (n-1)), we unset the rightmost set bit.
 * If we do n & (n-1) in a loop and count the no of times loop executes we get the set bit count.
 * The beauty of this solution is the number of times it loops is equal to the number of set bits in a given integer.
 *
 * @param {number} num
 */
const countOnesInBinary_Kernighan = (num) => {
  let count = 0;
  while (num !== 0) {
    // unset the right most bit
    num &= num - 1;
    count++;
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
const functions = [
  countOnesInBinary_recursion,
  countOnesInBinary_iteration,
  countOnesInBinary_Kernighan,
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
