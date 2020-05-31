/**
 * 30. Palindromes
 * Question: Given a linked list, write a function to determine whether the list is a palindrome.
 * Answer: https://www.byte-by-byte.com/palindromes/
 * Tags: [Stack][Linked List]
 */

class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }

  // Generate linked list from array
  static from(arr) {
    let head = null;
    let tail = null;
    arr.forEach((v) => {
      const node = new Node(v);
      if (!head) head = node;
      if (tail) tail.next = node;
      tail = node;
    });
    return head;
  }
}

/**
 * Determine whether the list is a palindrome
 * @param {Node} node
 */
const isPalindrome = (node) => {
  let p = node;
  let runner = node;
  let stack = [];

  // run to the end of list while collecting values in stack
  while (runner && runner.next) {
    // TODO: we only need to save second half of the list
    stack.push(p.val);
    p = p.next;
    runner = runner.next.next;
  }

  // skip middle if necessary
  if (runner) p = p.next;

  // check second half of list
  while (p) {
    if (stack.pop() !== p.val) return false;
    p = p.next;
  }
  return true;
};

const test_isPalindrome = (arr) => {
  const head = Node.from(arr);
  return isPalindrome(head);
};

const tests = [
  [[], true],
  [[1], true],
  [[1, 2, 3], false],
  [[1, 2, 1], true],
  [[4, 4], true],
  [[4, 2, 4], true],
  [[4, 2, 3, 3, 2, 4], true],
  [[4, 2, 3, 5], false],
  [[4, 2, 3, 1], false],
];
const functions = [test_isPalindrome];

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
