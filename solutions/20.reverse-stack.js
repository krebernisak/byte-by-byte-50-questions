// 20. Reverse Stack
// Question: Given a stack, reverse the items without creating any additional data structures.
// Answer: https://www.byte-by-byte.com/reversestack/
// Tags: [Stack]

/**
 * The reverse method transposes the elements of the calling array object in place,
 * mutating the array, and returning a reference to the array.
 * @param {Array} stack
 */
const reverse = (stack) => {
  // if we can not use any additional data structures we can still use the call stack (recursion)
  if (stack.length === 0) return stack;
  const val = stack.pop();
  stack = reverse(stack);
  insertAtBottom(stack, val);
  return stack;
};

const insertAtBottom = (stack, val) => {
  if (stack.length === 0) {
    stack.push(val);
    return;
  }

  const temp = stack.pop();
  insertAtBottom(stack, val);
  stack.push(temp);
};

const tests = [
  [[], []],
  [[1], [1]],
  [
    [1, 2],
    [2, 1],
  ],
  [
    [1, 2, 3, 4],
    [4, 3, 2, 1],
  ],
  [
    [1, 2, 3, 4, 5],
    [5, 4, 3, 2, 1],
  ],
];

// test helper
const test_isReversed = (fn) => {
  return (data, expected) => {
    const result = fn(data);
    console.log(result);
    return expected.toString() == result.toString();
  };
};

const functions = [test_isReversed(reverse)];

tests.forEach((v) => {
  functions.forEach((f) => {
    const res = f(v[0], v[1]);
    console.assert(
      res === true,
      `Function ${f.name} failed for [${v}] case [Expected: ${v[1]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
