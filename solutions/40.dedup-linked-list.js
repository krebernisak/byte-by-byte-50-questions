/**
 * 40. Dedup Linked List
 * Question: Given an unsorted linked list, write a function to remove all the duplicates.
 * Answer: https://www.byte-by-byte.com/deduplinkedlist/
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

// Remove duplicates from a linked list
const dedup = (list) => {
  const set = new Set();
  let prev = null;
  while (list !== null) {
    if (set.has(list.val)) {
      prev.next = list.next;
    } else {
      set.add(list.val);
      prev = list;
    }
    list = list.next;
  }
};

// Test helper
const test_dedup = (input, output) => {
  let list = Node.from(input);
  let outList = Node.from(output);
  dedup(list);
  while (list && outList) {
    if (list.val !== outList.val) return list;
    list = list.next;
    outList = outList.next;
  }
  return true;
};

const tests = [
  [[], []],
  [[1], [1]],
  [
    [1, 2],
    [1, 2],
  ],
  [
    [1, 2, 3, 4],
    [1, 2, 3, 4],
  ],
  [
    [1, 2, 3, 4, 4],
    [1, 2, 3, 4],
  ],
  [
    [1, 1, 2, 2, 3, 4],
    [1, 2, 3, 4],
  ],
  [
    [1, 2, 3, 4, 4, 4, 4, 2, 2],
    [1, 2, 3, 4],
  ],
];
const functions = [test_dedup];

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
