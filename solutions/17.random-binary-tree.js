// 17. Random Binary Tree
// https://www.byte-by-byte.com/randomBinarySearchTree/
// [Recursion][Graph][DFS]

/**
 * Get a random integer between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random integer
 */
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

class Node {
  constructor(data, left = null, right = null, children = 0) {
    this.data = data;
    this.left = left;
    this.right = right;
    // Children counter used to calculate subtree size
    this.children = children;
  }
}

class BinarySearchTree {
  constructor(root) {
    this.root = root;
  }

  insert(node) {
    if (!this.root) {
      this.root = node;
      return;
    }

    // DFS => find node position
    const stack = [this.root];
    const incrementChildren = () => stack.forEach((n) => n.children++);

    while (true) {
      const next = stack[stack.length - 1]; // do not pop to increment children after insertion
      if (node.data === next.data) throw new Error(`Duplicate: ${node.data}`);
      // check left subtree
      if (node.data < next.data) {
        if (next.left) stack.push(next.left);
        else {
          next.left = node;
          incrementChildren();
          return;
        }
      } else {
        // else go right
        if (next.right) stack.push(next.right);
        else {
          next.right = node;
          incrementChildren();
          return;
        }
      }
    }
  }

  insertAll = (data) => data.forEach((v) => this.insert(new Node(v)));

  // Return the number of nodes in a given subtree
  subtreeSize = (node) => (!node ? 0 : node.children + 1);

  // Return each node with probability 1/N
  randomNode() {
    if (!this.root) throw Error("Empty!");
    // This is an index of a node in the tree. Indices go in sorted order.
    const index = randomInt(0, this.subtreeSize(this.root));
    return nodeAt(index);
  }

  // Return node at index in the tree. Indices go in sorted order.
  nodeAt(index) {
    if (index < 0 || index >= this.subtreeSize(this.root))
      throw Error("Index out of bound!");
    const _nodeAtFrom = (node, i) => {
      // Get the size of left subtree
      const sizeLeft = this.subtreeSize(node.left);
      if (i === sizeLeft) return node;
      if (i < sizeLeft) return _nodeAtFrom(node.left, i);
      // The new index becomes the index of the same node but now within the
      // subtree rather than the whole tree
      return _nodeAtFrom(node.right, i - sizeLeft - 1);
    };
    return _nodeAtFrom(this.root, index);
  }
}

// Simple test helper
const test_dataAt = (data, index) => {
  const tree = new BinarySearchTree();
  tree.insertAll(data);
  return tree.nodeAt(index).data;
};

const tests = [
  [[1, 2, 3, 4, 5, 6], 0, 1],
  [[1, 2, 3, 4, 5, 6], 1, 2],
  [[1, 2, 3, 4, 5, 6], 5, 6],
  [[5, 6, 7, 1, 2, 3, 4], 6, 7],
  [[5, 6, 7, 1, 2, 3, 4], 3, 4],
  [[51, 16, 27, 11, 22, 31, 14], 3, 22],
  [[51, 16, 27, 11, 22, 31, 14], 4, 27],
];
const functions = [test_dataAt];

tests.forEach((v, i) => {
  functions.forEach((f) => {
    const res = f(v[0], v[1]);
    console.assert(
      res === v[2],
      `Function ${f.name} failed for [${v}] case [Expected: ${v[2]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
