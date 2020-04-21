// 24. Balanced Binary Tree
// Question: Given a binary tree, write a function to determine whether the tree is balanced.
// Answer: https://www.byte-by-byte.com/balancedtree/
// Tags: [Tree][Recursion]

class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const UNBALANCED = -1;
const isBalanced = (n) => getBalancedHeight(n) !== UNBALANCED;
// Get height if balanced or -1
const getBalancedHeight = (n) => {
  if (n === null) return 0;
  const heightLeft = getBalancedHeight(n.left);
  if (heightLeft === UNBALANCED) return UNBALANCED;
  const heightRight = getBalancedHeight(n.right);
  if (heightRight === UNBALANCED) return UNBALANCED;
  const diff = Math.abs(heightLeft - heightRight);
  return diff <= 1 ? Math.max(heightLeft, heightRight) + 1 : UNBALANCED;
};

// TODO: tests
