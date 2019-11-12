// 19. Sum
// https://www.byte-by-byte.com/sum/
// [Bitwise]

const sum = (a, b) => {
  if (b === 0) return a;
  const partial = a ^ b;
  const carry = (a & b) << 1;
  return sum(partial, carry);
};

const tests = [
  [0, 0, 0],
  [1, 2, 3],
  [-1, 1, 0],
  [-2, 4, 2],
  [1, 7, 8],
  [-11, 111, 100]
];
const functions = [sum];

tests.forEach(v => {
  functions.forEach(f => {
    const res = f(v[0], v[1]);
    console.assert(
      res === v[2],
      `Function ${f.name} failed for [${v}] case [Expected: ${
        v[2]
      }, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
