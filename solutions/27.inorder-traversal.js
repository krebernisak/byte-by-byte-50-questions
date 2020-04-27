/**
 * 27. Inorder Traversal
 * Question: Given a binary search tree, print out the elements of the tree in order without using recursion.
 * Answer: https://www.byte-by-byte.com/inordertraversal/
 * Tags: [Tree][DFS]
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
 * Inorder traversal [Left, Parent, Right] using recursion (call stack)
 *
 * @param {Node} node
 * @returns {number[]} - Inorder traversal order
 */
const inorder_recursion = (node) => {
  if (!node) return [];
  return [
    ...inorder_recursion(node.left),
    node.val,
    ...inorder_recursion(node.right),
  ];
};

/**
 * Inorder traversal [Left, Parent, Right] using iteration with stack
 *
 * @param {Node} node
 * @returns {number[]} - Inorder traversal order
 */
const inorder_iteration = (node) => {
  let order = [];
  if (!node) return order;
  let stack = [node.right, node.val, node.left];
  while (stack.length > 0) {
    let next = stack.pop();
    if (!next) continue;
    if (next instanceof Node) stack.push(next.right, next.val, next.left);
    else order.push(next);
  }
  return order;
};

const tests = [
  [[], []],
  [[1], [1]],
  [
    [2, 1, 3],
    [1, 2, 3],
  ],
  [
    [5, 2, 7, 1, 3],
    [1, 2, 3, 5, 7],
  ],
  [
    [5, 2, 7, 1, 3, 6, 8],
    [1, 2, 3, 5, 6, 7, 8],
  ],
];

// test helper
const test_inorder = (fn) => {
  return (data, expected) => {
    const tree = Node.from(data);
    const order = fn(tree);
    return expected.toString() === order.toString();
  };
};

const functions = [
  test_inorder(inorder_recursion),
  test_inorder(inorder_iteration),
];

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
