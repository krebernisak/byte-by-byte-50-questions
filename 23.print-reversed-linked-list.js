// 23. Print Reversed Linked List
// https://www.byte-by-byte.com/printreversedlist/
// [Linked List][Recursion]

class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }

  // Generate linked list from array
  static from(arr) {
    let head = null;
    let prev = null;
    arr.forEach((v, i) => {
      const node = new Node(v);
      if (i === 0) head = node;
      if (prev) prev.next = node;
      prev = node;
    });
    return head;
  }

  printReversed = () => {
    const _self = n => {
      if (!n) return;
      if (n.next) _self(n.next);
      console.log(n.val);
    };
    return _self(this);
  };
}

Node.from([1, 2, 3, 4, 5]).printReversed();
