// 22. Longest Consecutive Branch
// https://www.byte-by-byte.com/longestbranch/
// [Tree]

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
  insertAll = data => data.forEach(v => this.insert(new Node(v)));
  print = () => console.log(JSON.stringify(this.root, "", 2));
}

const lcb = (node, length = 0) => {
  if (!node) return length;
  return [node.left, node.right]
    .map(n => {
      if (!n || n.val !== node.val + 1) return length + 1;
      return lcb(n, length + 1);
    })
    .reduce((acc, v) => Math.max(acc, v));
};

// test helper
const test_lcb = (data, expected) => {
  const tree = new BinaryTree();
  tree.insertAll(data);
  const res = lcb(tree.root);
  return res === expected ? true : res;
};

const tests = [
  [[], 0],
  [[1], 1],
  [[1, 2], 2],
  [[1, 2, 3, 4], 2],
  [[1, 2, 3, 3], 3],
  [[1, 2, 3, 3, 4, 5, 6, 4], 4],
  [[0, 1, 2, 1, 2, 1, 3, 4, 4, 3], 4]
];
const functions = [test_lcb];

tests.forEach(v => {
  functions.forEach(f => {
    const res = f(v[0], v[1]);
    console.assert(
      res === true,
      `Function ${f.name} failed for [${v}] case [Expected: ${
        v[1]
      }, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
