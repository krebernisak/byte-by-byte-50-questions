// 25. Binary Search Tree Verification
// Question: Given a binary tree, write a function to test if the tree is a binary search tree.
// Answer: https://www.byte-by-byte.com/binarysearchtree/
// Tags: [Tree][BST]

class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root) {
    this.root = root;
  }
  insert(node) {
    if (!this.root) {
      this.root = node;
      return;
    }
    // BFS => find node position
    const queue = [this.root];
    while (true) {
      const next = queue.shift();
      // check left subtree
      if (next.left) queue.push(next.left);
      else {
        next.left = node;
        return;
      }
      // else go right
      if (next.right) queue.push(next.right);
      else {
        next.right = node;
        return;
      }
    }
  }
  insertAll = (data) => data.forEach((v) => this.insert(new Node(v)));
  print = () => console.log(JSON.stringify(this.root, "", 2));
}

// check if BinaryTree is a BinarySearchTree
const isBST = (
  node,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER
) => {
  if (node == null) return true;
  // check duplicates or out of bound
  if (node.val <= min || node.val >= max) return false;
  // check left and right subtree
  return isBST(node.left, min, node.val) && isBST(node.right, node.val, max);
};

// test helper
const test_isBST = (data) => {
  const bt = new BinaryTree();
  bt.insertAll(data);
  return isBST(bt.root);
};

const tests = [
  [[], true],
  [[1], true],
  [[1, 1], false],
  [[1, 2], false],
  [[2, 1], true],
  [[2, 1, 2], false],
  [[2, 1, 3], true],
  [[2, 1, 3, 4], false],
  [[5, 5, 7, 5, 5, 6, 8], false],
  [[5, 2, 7, 1, 3, 6, 8], true],
];
const functions = [test_isBST];

tests.forEach((v) => {
  functions.forEach((f) => {
    const res = f(v[0]);
    console.assert(
      res === v[1],
      `Function ${f.name} failed for [${v}] case [Expected: ${v[1]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
