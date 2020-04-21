// 44. Tree Level Order
// Question: Given a tree, write a function that prints out the nodes of the tree in level order.
// Answer: https://www.byte-by-byte.com/treelevelorder/
// Tags: [Tree][BFS]

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

const levelOrder = (node) => {
  const order = [];
  if (!node) return order;

  const queue = [node];
  while (queue.length > 0) {
    const n = queue.shift();
    order.push(n.val);
    if (n.left) queue.push(n.left);
    if (n.right) queue.push(n.right);
  }

  return order;
};

const tests = [
  [null, []],
  [[], []],
  [[1], [1]],
  [
    [1, 2],
    [1, 2],
  ],
  [
    [2, 1],
    [2, 1],
  ],
  [
    [1, 2, 3],
    [1, 2, 3],
  ],
  [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5],
  ],
  [
    [1, 2, 3, 4, 5, 6, 7, 8],
    [1, 2, 3, 4, 5, 6, 7, 8],
  ],
];

// test helper
const test = (fn) => {
  return (data, expected) => {
    const node = Node.from(data);
    const result = fn(node);
    return expected.toString() === result.toString();
  };
};

const functions = [test(levelOrder)];

tests.forEach((v) => {
  functions.forEach((f) => {
    const res = f(v[0], v[1]);
    console.assert(
      res,
      `Function ${f.name} failed for [${v}] case [Expected: ${v[1]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
