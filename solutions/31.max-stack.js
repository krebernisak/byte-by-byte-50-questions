// 31. Max Stacks
// Question: Implement a LIFO stack that has a push(), pop(), and max() function,
//   where max() returns the maximum value in the stack. All of these functions should run in O(1) time
// Answer: https://www.byte-by-byte.com/maxstack/

// Stack keeping track of max at index
class Stack_TrackMax {
  constructor() {
    this.stack = [];
  }
  push(val) {
    let max = this.max() || Number.MIN_SAFE_INTEGER;
    this.stack.push([val, Math.max(val, max)]);
  }
  pop() {
    return this.stack.pop()[0];
  }
  max() {
    return this.stack.length > 0
      ? this.stack[this.stack.length - 1][1]
      : undefined;
  }
}

// Secondary stack keeping track of max with counters
class Stack_CountMax {
  constructor() {
    this.stack = [];
    this.maxStack = [];

    this._popMax = () => {
      let n = this.maxStack.length;
      if (n === 0) return undefined;

      let [max, count] = this.maxStack[n - 1];
      if (count === 1) this.maxStack.pop();
      else this.maxStack[n - 1] = [max, count - 1];
      return max;
    };

    this._pushMax = (val) => {
      let n = this.maxStack.length;
      if (n === 0) this.maxStack.push([val, 1]);
      else {
        let [max, count] = this.maxStack[n - 1];
        if (val <= max) this.maxStack[n - 1] = [max, count + 1];
        else this.maxStack.push([val, 1]);
      }
    };
  }
  push(val) {
    this._pushMax(val);
    this.stack.push(val);
  }
  pop() {
    this._popMax();
    return this.stack.pop();
  }
  max() {
    return this.maxStack.length > 0
      ? this.maxStack[this.maxStack.length - 1][0]
      : undefined;
  }
}

const data = [4, 3, 25, 6, 7, 100, -1];
const tests = [
  [
    [
      // operation
      (s) => s.push(5),
      (s) => s.pop(),
    ],
    [
      // tests
      (s) => s.pop() === -1,
      (s) => s.max() === 100,
    ],
  ],
  [
    [
      // operation
      (s) => s.push(3),
      (s) => s.pop(),
      (s) => s.pop(),
    ],
    [
      // tests
      (s) => s.pop() === 100,
      (s) => s.max() === 25,
    ],
  ],
  [
    [
      // operation
      (s) => s.pop(),
      (s) => s.pop(),
      (s) => s.push(8),
      (s) => s.max(),
      (s) => s.max(),
    ],
    [
      // tests
      (s) => s.pop() === 8,
      (s) => s.max() === 25,
    ],
  ],
  [
    [
      // operation
      (s) => s.pop(),
      (s) => s.pop(),
      (s) => s.pop(),
      (s) => s.pop(),
      (s) => s.pop(),
    ],
    [
      // tests
      (s) => s.pop() === 3,
      (s) => s.max() === 4,
    ],
  ],
  [
    [
      // operation
      (s) => s.pop(),
      (s) => s.push(500),
      (s) => s.push(300),
      (s) => s.max(),
      (s) => s.push(200),
      (s) => s.max(),
    ],
    [
      // tests
      (s) => s.pop() === 200,
      (s) => s.max() === 500,
    ],
  ],
];

const test_MaxStack = (Fn, data) => {
  return (ops, tests) => {
    const stack = new Fn();
    data.forEach((el) => stack.push(el));
    ops.forEach((op) => op(stack));
    return tests.every((t) => t(stack));
  };
};

const functions = [
  test_MaxStack(Stack_TrackMax, data),
  test_MaxStack(Stack_CountMax, data),
];

tests.forEach((v) => {
  functions.forEach((f) => {
    const res = f(v[0], v[1]);
    console.assert(
      res === true,
      `Function ${f.name} failed for [${v}] case [Expected: true, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
