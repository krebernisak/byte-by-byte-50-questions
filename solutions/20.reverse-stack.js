/**
 * 20. Reverse Stack
 * Question: Given a stack, reverse the items without creating any additional data structures.
 * Answer: https://www.byte-by-byte.com/reversestack/
 * Tags: [Stack]
 */

/**
 * The reverse method transposes the elements of the calling array object in place,
 * mutating the array, and returning a reference to the array.
 * @param {Array} stack
 */
const reverse_recursion = (stack) => {
  if (stack.length === 0) return stack;
  const val = stack.pop();
  stack = reverse_recursion(stack);
  insertAtBottom(stack, val);
  return stack;
};

const reverse_iteration = (stack) => {
  if (stack.length === 0) return stack;
  let n = stack.length;
  while (n-- > 0) insertAtBottom(stack, stack.pop());
  return stack;
};

// Always recursion! This is where we need the call stack (recursion),
// if we can not use any additional data structures.
const insertAtBottom = (stack, val) => {
  if (stack.length === 0) {
    stack.push(val);
    return;
  }

  const top = stack.pop();
  insertAtBottom(stack, val);
  stack.push(top);
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
    return expected.toString() == result.toString();
  };
};

const functions = [
  test_isReversed(reverse_recursion),
  test_isReversed(reverse_iteration),
];

tests.forEach((v) => {
  functions.forEach((f) => {
    const res = f(...v);
    console.assert(
      res === true,
      `Function ${f.name} failed for [${v}] case [Expected: ${v[1]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
