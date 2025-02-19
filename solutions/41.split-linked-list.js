/**
 * 41. Split a Linked List
 * Question: Given a linked list, write a function to split the list into two equal halves.
 * Answer: https://www.byte-by-byte.com/splitlinkedlist/
 * Tags: [Linked List]
 */

class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }

  // Generate linked list from array
  static from(arr) {
    let head = null;
    let tail = null;
    arr.forEach((v) => {
      const node = new Node(v);
      if (!head) head = node;
      if (tail) tail.next = node;
      tail = node;
    });
    return head;
  }
}

// Split the list into two equal halves.
const divide = (list) => {
  if (!list) return null;
  let slow = list;
  let fast = list;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let out = slow.next;
  slow.next = null;
  return out;
};

// test helper
const test_divide = (data, expected) => {
  let secondHalf = divide(Node.from(data));
  let firstVal = secondHalf ? secondHalf.val : null;
  return firstVal === expected ? true : firstVal;
};

const tests = [
  [[], null],
  [[1], null],
  [[1, 2], 2],
  [[1, 2, 3, 4], 3],
  [[1, 2, 3, 4, 5], 4],
  [[1, 2, 3, 4, 5, 6], 4],
  [[1, 2, 3, 4, 5, 6, 7], 5],
];
const functions = [test_divide];

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
