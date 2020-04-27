/**
 * 18. Lowest Common Ancestor
 * Question: Given two nodes in a binary tree, write a function to find the lowest common ancestor.
 * Answer: https://www.byte-by-byte.com/lowestcommonancestor/
 * Tags: [Tree]
 * Links:
 *   - BFS vs. DFS => https://stackoverflow.com/a/3332994/1252289
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
 * Find path from Node A to Node B
 *
 * @param {Node} nodeA
 * @param {Node} nodeB
 * @returns {Node[]} - Path from Node A to Node B
 */
const pathTo = (nodeA, nodeB) => {
  let path = [];
  if (!nodeA || !nodeB) return path;

  path = [nodeA];
  const stack = [path];
  while (stack.length > 0) {
    path = stack.pop();
    next = path[path.length - 1];
    if (!next) continue;
    if (next === nodeB) return path; // path found
    stack.push([...path, next.left], [...path, next.right]);
  }

  return []; // path NOT found
};

/**
 * Find the lowest common ancestor for two nodes in a binary tree.
 *
 * @param {Node} tree
 * @param {Node} nodeA
 * @param {Node} nodeB
 */
const findLowestCommonAncestor = (tree, nodeA, nodeB) => {
  if (!tree) return null;

  const pathToA = pathTo(tree, nodeA);
  if (!pathToA) return null;
  const pathToB = pathTo(tree, nodeB);
  if (!pathToB) return null;

  let common = null;
  for (let i = 0; i < pathToA.length || i < pathToA.length; i++) {
    if (pathToA[i] !== pathToB[i]) break;
    else common = pathToA[i];
  }

  return common;
};

const tests = [
  [
    // data, getNodeA(), getNodeB, getExpected
    [1, 2, 3, 4, 5, 6, 7],
    (n) => n.left.left,
    (n) => n.right.right,
    (n) => n, // root
  ],
  [
    [1, 2, 3, 4, 5, 6, 7],
    (n) => n.left.left,
    (n) => n.right,
    (n) => n, // root
  ],
  [
    [1, 2, 3, 4, 5, 6, 7],
    (n) => n.left.left,
    (n) => n.left.right,
    (n) => n.left,
  ],
  [
    [1, 2, 3, 4, 5, 6, 7],
    (n) => n.right.left,
    (n) => n.right.right,
    (n) => n.right,
  ],
];

// test helper
const test_common = (fn) => {
  return (data, getNodeA, getNodeB, getExpected) => {
    const tree = Node.from(data);
    const [nodeA, nodeB] = [getNodeA(tree), getNodeB(tree)];
    return getExpected(tree) === fn(tree, nodeA, nodeB);
  };
};

const functions = [test_common(findLowestCommonAncestor)];

tests.forEach((v) => {
  functions.forEach((f) => {
    const res = f(...v);
    console.assert(
      res === true,
      `Function ${f.name} failed for [${v}] case [Expected: true, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
