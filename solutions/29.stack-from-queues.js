// 29. Stack from Queues
// Question: Implement a LIFO stack with basic functionality (push and pop) using FIFO queues to store the data.
// Answer: https://www.byte-by-byte.com/stackfromqueues/
// Tags: [Stack][Queue]

// https://jsperf.com/queue-push-unshift-vs-shift-pop
// https://stackoverflow.com/a/1590277/1252289

class Stack {
  constructor() {
    // We use our Queue implementation because Array.shift method is O(n) slow
    this.primaryQ = new QueueFromStack();
    this.secondaryQ = new QueueFromStack();
    this.topElement = undefined;
  }

  /**
   * Returns whether the stack is empty.
   * @return {boolean}
   */
  get length() {
    return this.primaryQ.length;
  }

  /**
   * Push element x onto stack.
   * @param {number} x
   * @return {void}
   */
  push(val) {
    this.primaryQ.push(val);
    this.topElement = val;
  }

  /**
   * Removes the element on top of the stack and returns that element.
   * @return {number}
   */
  pop() {
    while (this.primaryQ.length > 1) {
      let el = this.primaryQ.shift();
      if (this.primaryQ.length === 1) this.topElement = el;
      this.secondaryQ.push(el);
    }
    let result = this.primaryQ.shift();
    [this.primaryQ, this.secondaryQ] = [this.secondaryQ, this.primaryQ];
    return result;
  }

  /**
   * Get the top element.
   * @return {number}
   */
  top() {
    return this.topElement;
  }
}

/**
 * Simple fast O(1) enqueue/dequeue queue using hash map.
 */
class QueueFromMap {
  constructor() {
    this.storage = {};
    this.first = 0;
    this.last = 0;

    this.push = this.enqueue;
    this.shift = this.dequeue;
  }

  get length() {
    return this.last - this.first;
  }

  isEmpty() {
    return this.last === this.first;
  }

  enqueue(val) {
    this.storage[this.last] = val;
    this.last++;
  }

  dequeue() {
    let next = this.storage[this.first];
    delete this.storage[this.first];
    this.first++;
    return next;
  }

  peek() {
    return this.storage[this.first];
  }
}

class QueueFromStack {
  constructor() {
    this.inStack = [];
    this.outStack = [];

    this.push = this.enqueue;
    this.shift = this.dequeue;
  }

  get length() {
    return this.inStack.length + this.outStack.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  enqueue(val) {
    this.inStack.push(val);
  }

  dequeue() {
    if (this.outStack.length === 0) this._move();
    return this.outStack.pop();
  }

  _move() {
    while (this.inStack.length) {
      this.outStack.push(this.inStack.pop());
    }
  }
}
