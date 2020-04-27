/**
 * 36. Rotate Bits
 * Question: Given a number, write a function to rotate the bits (ie circular shift).
 * Answer: https://www.byte-by-byte.com/rotatebits
 * Tags: [Bitwise]
 * Links:
 *   - Example how to force Int32 - https://stackoverflow.com/a/19843976/1252289
 */

// Example how to force Int32
console.log(0xf0000fff | 0);
console.log(0xf0000fff >> 0);

const rotateClockwise = (bits, k) => (bits >>> k) | (bits << (32 - k));
const rotateCounterClockwise = (bits, k) => (bits << k) | (bits >>> (32 - k));

const rotateClockwise_Stepper = (bits, k) => {
  while (k-- > 0) {
    const bit = bits & 1; // get rightmost bit
    bits = bits >>> 1; // shift right
    bits = bits | (bit << 31); // set leftmost bit
  }
  return bits;
};

const tests = [
  [0, 0, 0],
  [0, 2, 0],
  [1, 0, 1],
  [2, 1, 1],
  [1, 1, 1 << 31],
  [1, 2, 1 << 30],
  [0xffff0000, 4, 0x0ffff000],
  [0xffff0000, 8, 0x00ffff00],
  [0xffff0000, 12, 0x000ffff0],
  [0xffff0000, 16, 0x0000ffff],
  [0xffff0000, 20, 0xf0000fff | 0],
  [0xffff0000, 24, 0xff0000ff | 0],
  [0xffff0000, 28, 0xfff0000f | 0],
  [0xffff0000, 32, 0xffff0000 | 0],
  [0x13579bdf, 4, 0xf13579bd | 0],
  [0x13579bdf, 12, 0xbdf13579 | 0],
  [0b1011001110001111000011111000, 1, 0b0101100111000111100001111100],
  [0b1011001110001111000011111000, 2, 0b0010110011100011110000111110],
  // [0b1011001110001111000011111000, 4, 0b1000101100111000111100001111 | 0],
];
const functions = [rotateClockwise, rotateClockwise_Stepper];

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
