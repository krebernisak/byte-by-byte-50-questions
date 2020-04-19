// 38. Linked List Cycles
// Question: Given a linked list, determine whether it contains a cycle.
// Answer: https://www.byte-by-byte.com/listcycles/
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

const createCycle = (node, index) => {
  if (!node || index < 0) return node;
  // find cycle entrance
  let p = node;
  while (index !== 0 && p && p.next) {
    p = p.next;
    index--;
  }
  if (index !== 0) return; // out of bound
  // create cycle
  let n = p;
  while (n.next) n = n.next;
  n.next = p;
};

// Algorithm using extra space. Mark visited nodes and check that you
// only visit each node once.
const getCycleInNode_Set = (node) => {
  const nodeSet = new Set();
  for (let n = node; n !== null; n = n.next) {
    if (nodeSet.has(n)) return n;
    else nodeSet.add(n);
  }
  return null;
};

const detectCycle_Set = (node) => getCycleInNode_Set(node) !== null;

// Floyd's algorithm. Increment one pointer by one and the other by two.
// If they are ever pointing to the same node, there is a cycle.
// Explanation: https://www.quora.com/How-does-Floyds-cycle-finding-algorithm-work
const detectCycle_Floyd = (node) => {
  if (!node || !node.next) return false;
  let slow = node;
  let fast = node.next;
  while (fast && fast.next && slow !== fast) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow === fast;
};

const tests = [
  [[], -1, false],
  [[], 2, false],
  [[1], 0, true],
  [[1, 2], -1, false],
  [[1, 2], 0, true],
  [[1, 2], 1, true],
  [[1, 2, 3, 4], -1, false],
  [[1, 2, 3, 4], 2, true],
  [[1, 2, 3, 4, 4], 2, true],
  [[1, 1, 2, 2, 3, 4], 3, true],
  [[1, 2, 3, 4, 4, 4, 4, 2, 2], 7, true],
  [[1, 2, 3, 4, 4, 4, 4, 2, 2], 17, false],
];

// test helper
const test_cycleDetection = (fn) => {
  return (data, cycleIndex, expected) => {
    const list = Node.from(data);
    createCycle(list, cycleIndex);
    return expected === fn(list);
  };
};

const functions = [
  test_cycleDetection(detectCycle_Set),
  test_cycleDetection(detectCycle_Floyd),
];

tests.forEach((v) => {
  functions.forEach((f) => {
    const res = f(v[0], v[1], v[2]);
    console.assert(
      res === true,
      `Function ${f.name} failed for [${v}] case [Expected: ${v[1]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
