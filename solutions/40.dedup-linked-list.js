// 40. Dedup Linked List
// https://www.byte-by-byte.com/deduplinkedlist/
// [Linked List]

class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }

  // Generate linked list from array
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

// Remove duplicates from a linked list
const dedup = (list) => {
  let set = new Set();
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
    const res = f(v[0], v[1]);
    console.assert(
      res === true,
      `Function ${f.name} failed for [${v}] case [Expected: ${v[1]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
