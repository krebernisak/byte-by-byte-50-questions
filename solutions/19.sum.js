// 19. Sum
// Question: Given two integers, write a function to sum the numbers without using any arithmetic operators.
// Answer: https://www.byte-by-byte.com/sum/
// Tags: [Bitwise]

// XOR (a ^ b) is addition without carry.
// (a & b) is the carry-out from each bit.
// (a & b) << 1 is the carry-in to each bit.

const sum_recursion = (a, b) => {
  if (b === 0) return a;
  const partial = a ^ b;
  const carry = (a & b) << 1;
  return sum_recursion(partial, carry);
};

const sum_iteration = (a, b) => {
  while (true) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
    if (b === 0) break;
  }
  return a;
};

const tests = [
  [0, 0, 0],
  [1, 2, 3],
  [-1, 1, 0],
  [-2, 4, 2],
  [1, 7, 8],
  [-11, 111, 100],
];
const functions = [sum_recursion, sum_iteration];

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
