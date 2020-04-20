// 39. Random Linked List
// Question: Given a linked list where each node has two pointers,
//   one to the next node and one to a random node in the list, clone the linked list.
// Answer: https://www.byte-by-byte.com/randomlinkedlist/
// Tags: [Linked List]

class Node {
  constructor(val, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
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

/**
 * Return Node at index
 *
 * @param {Node} node - Linked List head
 * @param {number} index - Index of node to return
 */
const getAtIndex = (node, index) => {
  if (!node || index < 0) return node;
  // find cycle entrance
  let p = node;
  while (index !== 0 && p && p.next) {
    p = p.next;
    index--;
  }
  if (index !== 0) return null; // out of bound
  return p;
};

/**
 * Create random pointer cycle
 *
 * @param {Node} node - Linked List head
 * @param {number} i - Random pointer FROM node index
 * @param {number} j - Random pointer TO node index
 */
const createCycle = (node, i, j) => {
  if (!node || i < 0 || j < 0) return;
  const iNode = getAtIndex(node, i);
  const jNode = getAtIndex(node, j);
  if (!iNode || !jNode) return;
  iNode.random = jNode;
};

/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 *
 * @param {Node} node
 */
const clone_Map = (node) => {
  let clone = null;
  if (!node) return clone;

  // mapping from List#1 nodes to List#2 nodes
  const nodeMap = new Map();

  let p1 = node;
  let p2 = (clone = new Node(node.val));
  while (p1) {
    // set next pointer
    let p2Next = null;
    if (p1.next) {
      p2Next = nodeMap.get(p1.next);
      if (!p2Next) {
        p2Next = new Node(p1.next.val);
        nodeMap.set(p1.next, p2Next);
      }
    }
    p2.next = p2Next;

    // set random pointer
    let p2Random = null;
    if (p1.random) {
      p2Random = nodeMap.get(p1.random);
      if (!p2Random) {
        p2Random = new Node(p1.random.val);
        nodeMap.set(p1.random, p2Random);
      }
    }
    p2.random = p2Random;

    // iterate next
    p1 = p1.next;
    p2 = p2.next;
  }

  return clone;
};

// TODO!
/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 *
 * @param {Node} node
 */
const clone_InPlace = (node) => {
  if (!node) return null;
};

const tests = [
  [[], []],
  [[0], [[0, 0]]],
  [
    [0, 1, 2, 3, 4, 5],
    [
      [1, 3],
      [2, 1],
      [3, 3],
      [4, 2],
    ],
  ],
  [
    [0, 1, 2, 3, 4, 5],
    [
      [0, 5],
      [5, 0],
      [1, 4],
    ],
  ],
];

// test helper
const test_clone = (fn) => {
  return (data, cycles) => {
    let list = Node.from(data);
    cycles.forEach((c) => createCycle(list, c[0], c[1]));
    let clone = fn(list);

    let p1 = list;
    let p2 = clone;
    while (p1) {
      if (!p2 || p1.val !== p2.val) return false;
      if (p1.random && (!p2.random || p1.random.val !== p2.random.val))
        return false;

      p1 = p1.next;
      p2 = p2.next;
    }

    return true;
  };
};

const functions = [test_clone(clone_Map)];

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
