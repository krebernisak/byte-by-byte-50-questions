// 42. Nth to the Last Element
// Question: Given a linked list, and an input n, write a function that returns the nth-to-last element of the linked list.
// Answer: https://www.byte-by-byte.com/nthtolastelement/
// Tags: [Linked List]

class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }

  /// Generate linked list from array
  static from(arr) {
    let head = null;
    let prev = null;
    arr.forEach((v, i) => {
      const node = new Node(v);
      if (i === 0) head = node;
      if (prev) prev.next = node;
      prev = node;
    });
    return head;
  }
}

// Get Nth to the Last Element
const nthToLast = (list, n) => {
  if (!list) return null;
  let slow = list;
  let fast = list;
  // Move fast pointer n steps
  while (fast.next && n-- > 0) fast = fast.next;
  // If end of list before n steps return null
  if (n > 0) return null;
  // Move both pointers until faster reaches the end
  while (fast.next) [slow, fast] = [slow.next, fast.next];
  return slow.val;
};

// test helper
const test_nthToLast = (data, n) => nthToLast(Node.from(data), n);

const tests = [
  [[], 0, null],
  [[1], 1, null],
  [[1], 5, null],
  [[1], 0, 1],
  [[1, 2], 1, 1],
  [[1, 2, 3, 4], 1, 3],
  [[1, 2, 3, 4, 5], 0, 5],
  [[1, 2, 3, 4, 5], 1, 4],
  [[1, 2, 3, 4, 5], 2, 3],
  [[1, 2, 3, 4, 5], 3, 2],
  [[1, 2, 3, 4, 5], 4, 1],
  [[1, 2, 3, 4, 5], 5, null],
];
const functions = [test_nthToLast];

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
