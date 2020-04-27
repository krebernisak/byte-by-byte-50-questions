/**
 * 33. Big Int Modules
 * Question: Given a list of bytes a, each representing one byte of a larger integer
 *   (ie. {0x12, 0x34, 0x56, 0x78} represents the integer 0x12345678), and an integer b, find a % b.
 * Answer: https://www.byte-by-byte.com/bigintmod/
 * Tags: [Bitwise]
 */

/**
 * Calculate modulo of a big number represented as array of bytes
 *
 * @param {number[]} byteArr - big number represented as array of bytes
 * @param {number} m - number to modulo with
 */
const mod = (byteArr, m) => {
  let res = 0;
  byteArr.forEach((val) => {
    if (val > 2 ** 8 - 1) throw Error(`Non byte: ${val} > ${2 ** 8 - 1}`);
    res <<= 8;
    res += val;
    res %= m;
  });
  return res;
};

const tests = [
  [[], 10, 0],
  [[0], 10, 0],
  [[10], 10, 0],
  [[10, 10], 10, 0],
  [[0x0a, 0x0a], 10, 0],
  [[0x22, 0x22], 6, 2],
  [[0x22, 0x22], 2, 0],
  [[0x03, 0xed], 10, 5],
  [[0x03, 0xed], 5, 0],
  [[0x1c, 0x69, 0xea, 0x7d, 0x22, 0xa7], 7, 3],
  [[0x1c, 0x69, 0xea, 0x7d, 0x22, 0xa7], 3, 0],
];
const functions = [mod];

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
