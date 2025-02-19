/**
 * 23. Print Reversed Linked List
 * Question: Given a linked list, write a function that prints the nodes of the list in reverse order.
 * Answer: https://www.byte-by-byte.com/printreversedlist/
 * Tags: [Linked List][Recursion]
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

function* getReversed(node) {
  if (!node) return;
  if (node.next) printReversed(node.next);
  yield node;
}

const printReversed = (node) => {
  for (const n of getReversed(node)) console.log(n.val);
};

const list = Node.from([1, 2, 3, 4, 5]);
printReversed(list);
