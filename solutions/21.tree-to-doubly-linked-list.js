/**
 * 21. Tree to Doubly Linked List
 * Question: Given a tree, write a function to convert it into a circular
 *   doubly linked list from left to right by only modifying the existing pointers.
 * Answer: https://www.byte-by-byte.com/treetolist/
 * Tags:  [Tree][Linked List]
 */

class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  // Function to construct Tree nodes in level order
  static from(arr) {
    const root = new Node(null);
    if (!arr) return root;

    const _left = (i) => 2 * i + 1;
    const _right = (i) => _left(i) + 1;

    const _insert = (node, i) => {
      // Base case for recursion
      if (i < arr.length) {
        node = new Node(arr[i]);

        // insert left child
        node.left = _insert(node.left, _left(i));
        // insert right child
        node.right = _insert(node.right, _right(i));
      }
      return node;
    };

    return _insert(root, 0);
  }
}

/**
 * Inorder traversal [Left, Parent, Right] generator using recursion (call stack)
 *
 * @param {Node} node
 * @returns {number[]} - Inorder traversal order
 */
function* inorder(node) {
  if (!node) return [];
  yield* inorder(node.left);
  yield node;
  yield* inorder(node.right);
}

/**
 * Transform Tree to Doubly Linked List
 *
 * @param {Node} tree
 * @return {Node} - Head of the doubly linked list
 */
const toList = (tree) => {
  let head = null;
  if (!tree) return head;

  let prev = null;
  for (const n of inorder(tree)) {
    if (!head) head = n;
    if (prev) [prev.right, n.left] = [n, prev];
    prev = n;
  }

  // add cycle
  [head.left, prev.right] = [prev, head];
  return head;
};

const tests = [
  [[], []],
  [[1], [1]],
  [[1], [1, 1, 1]],
  [
    [2, 1],
    [1, 2, 1, 2, 1, 2],
  ],
  [
    [5, 2, 7, 1, 3, 6, 8],
    [1, 2, 3, 5],
  ],
  [
    [5, 2, 7, 1, 3, 6, 8],
    [1, 2, 3, 5, 6, 7, 8, 1, 2, 3],
  ],
  [
    [5, 2, 7, 1, 3, 6, 8],
    [1, 2, 3, 5, 6, 7, 8, 1, 2, 3, 5, 6, 7, 8],
  ],
];

// test helper
const test_toList = (fn) => {
  return (data, expected) => {
    const tree = Node.from(data);
    let head = fn(tree);
    return expected.every((el) => {
      const equal = el === head.val;
      head = head.right;
      return equal;
    });
  };
};

const functions = [test_toList(toList)];

tests.forEach((v) => {
  functions.forEach((f) => {
    const res = f(v[0], v[1]);
    console.assert(
      res === true,
      `Function ${f.name} failed for [${v}] case [Expected: true, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
