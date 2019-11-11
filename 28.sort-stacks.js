// 28. Sort Stacks
// https://www.byte-by-byte.com/sortstacks/
// [Stack][Sort]

const naturalOrder = (a, b) => {
  if (a === b) return 0;
  return a > b ? 1 : -1;
};

const reverseOrder = (a, b) => naturalOrder(b, a);

const selectionSort = (stack, compare = naturalOrder) => {
  const _self = (s1, s2, sortedLength = 0) => {
    // console.log(s1, s2, sortedLength);
    let inOrder = true;
    let currMax = null;
    while (s1.length > sortedLength) {
      const curr = s1.pop();
      if (currMax === null) currMax = curr;
      else if (compare(curr, currMax) >= 0) {
        s2.push(currMax);
        currMax = curr;
      } else {
        s2.push(curr);
        inOrder = false;
      }
    }
    if (currMax) s1.push(currMax);
    while (s2.length > 0) s1.push(s2.pop());
    if (inOrder) return s1;
    return _self(s1, s2, sortedLength + 1);
  };
  return _self(stack, []);
};

const insertionSort = (stack, compare = naturalOrder) => {
  const n = stack.length;
  const _self = (s1, s2) => {
    // console.log(s1, s2);
    if (s2.length === n) return s2;
    const next = s1.pop();
    while (true) {
      if (s2.length === 0) break;
      if (compare(next, s2[s2.length - 1]) <= 0) break;
      s1.push(s2.pop());
    }
    s2.push(next);
    return _self(s1, s2);
  };
  return _self(stack, []);
};

const test_sort = fn => (input, comparator, expected) => {
  const output = fn(input, comparator);
  if (output.length !== expected.length) return output;
  const isExpected = (acc, v, i) => acc && v === expected[i];
  return output.reduce(isExpected, true) || expected;
};

const test_orders = [naturalOrder, reverseOrder];
const test_cases = [
  [],
  [1],
  // [1, 0, 2], TODO: fix 0
  [1, 2, -1],
  [1, -2, 2, -1],
  [1, 2, 3, 4],
  [1, 3, 5, 2, 6, 7, 8, 2, 3],
  [4, 5, 2, 4, 5, 5, 9, 1, 9],
  ["A", "C", "B", "A"]
];
const toTest = (c, fn) => [[...c], fn, [...c].sort(fn).reverse()];
const tests = test_orders.flatMap(o => test_cases.map(c => toTest(c, o)));
const functions = [test_sort(selectionSort), test_sort(insertionSort)];

tests.forEach(v => {
  functions.forEach(f => {
    const res = f(v[0], v[1], v[2]);
    console.assert(
      res === true,
      `Function ${f.name} failed for [${v}] case [Expected: ${
        v[2]
      }, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
