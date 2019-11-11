// 50. Priority Queue
// https://www.byte-by-byte.com/priorityqueue/
// [Heap]

const naturalOrder = (a, b) => {
  if (a === b) return 0;
  return a > b ? 1 : -1;
};

const reverseOrder = (a, b) => naturalOrder(b, a);

// heap as array utility
const parent = i => Math.ceil(i / 2 - 1);
const left = i => 2 * i + 1;
const right = i => left(i) + 1;
const swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);

class PriorityQueue {
  constructor(maxSize, comparator = naturalOrder) {
    this.size = 0;
    this.heap = new Array(maxSize);
    this._less = (i, j) => comparator(this.heap[i], this.heap[j]) <= 0;
  }
  add = val => {
    if (this.size === this.heap.length) throw new Error("At max capacity");
    // add value and increment size
    this.heap[this.size++] = val;
    if (this.size === 1) return;
    // bubble up
    let k = this.size - 1;
    while (k > 1) {
      const p = parent(k);
      if (this._less(p, k)) break;
      swap(this.heap, p, k);
      k = p;
    }
  };
  addAll = vals => (vals || []).forEach(this.add);
  pool = () => {
    if (this.size === 0) return null;
    const top = this.heap[0];
    // swap first and last
    swap(this.heap, 0, this.size - 1);
    this.heap[this.size - 1] = undefined;
    this.size--;
    if (this.size === 1) return top;
    // bubble down
    let k = 0;
    while (2 * k <= this.size) {
      let j = left(k);
      if (j < this.size && !this._less(j, right(k))) j = right(k);
      if (this._less(k, j)) break;
      swap(this.heap, k, j);
      k = j;
    }
    return top;
  };
  peek = () => (this.size === 0 ? null : this.heap[0]);
}

// test generator
const test_WithOrder = (data, comparator, operations, results) =>
  operations.map((ops, i) => [data, comparator, ops, results[i]]);

// test helper
const test_PriorityQueue = (input, comparator, ops, expected) => {
  const pq = new PriorityQueue(input.length, comparator);
  pq.addAll(input);
  const result = ops.map(fn => fn(pq)).pop();
  return expected === result ? true : result;
};

const data = [4, 3, 25, 6, 7, 100, -1];
const test_operations = [
  [
    // operations
    pq => pq.pool(),
    pq => pq.peek()
  ],
  [
    // operations
    pq => pq.pool(),
    pq => pq.peek(),
    pq => pq.pool()
  ],
  [
    // operations
    pq => pq.pool(),
    pq => pq.peek(),
    pq => pq.pool(),
    pq => pq.peek(),
    pq => pq.pool()
  ],
  [
    // operations
    pq => pq.pool(),
    pq => pq.pool(),
    pq => pq.pool(),
    pq => pq.pool(),
    pq => pq.pool()
  ],
  [
    // operations
    pq => pq.pool(),
    pq => pq.peek(),
    pq => pq.add(-1),
    pq => pq.pool()
  ],
  [
    // operations
    pq => pq.pool(),
    pq => pq.pool(),
    pq => pq.add(-1),
    pq => pq.add(-10),
    pq => pq.pool()
  ]
];
const tests = [
  ...test_WithOrder(data, naturalOrder, test_operations, [3, 3, 4, 7, -1, -10]),
  ...test_WithOrder(data, reverseOrder, test_operations, [25, 25, 7, 4, 25, 7])
];
const functions = [test_PriorityQueue];

tests.forEach(v => {
  functions.forEach(f => {
    const res = f(v[0], v[1], v[2], v[3]);
    console.assert(
      res === true,
      `Function ${f.name} failed for [${v}] case [Expected: ${
        v[3]
      }, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
