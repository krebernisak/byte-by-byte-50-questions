// 8. Merge K Arrays
// Question: Given k sorted arrays, merge them into a single sorted array.
// Answer: https://www.byte-by-byte.com/mergekarrays/
// [Sort][Priority Queue]

// Dumb PriorityQueue with O(n * log n) enqueue (I am tired to build a min heap now)
class PriorityQueue {
  constructor() {
    this.queue = [];
    const reverseOrder = (a, b) => b - a;
    this.comparator = reverseOrder;
  }
  get length() {
    return this.queue.length;
  }
  enqueue(val) {
    this.queue.push(val);
    this.queue.sort(this.comparator);
  }
  dequeue() {
    return this.queue.pop();
  }
}

const sort = (data) => {
  const result = [];
  if (!data) return result;
  const k = data.length;
  const pq = new PriorityQueue();
  const pointers = Array(k).fill(0);

  while (true) {
    let anyElementsLeft = false;
    for (let i = 0; i < k; i++) {
      const p = pointers[i]++;
      if (p >= data[i].length) continue;
      anyElementsLeft = true;
      const el = data[i][p];
      pq.enqueue(el);
    }

    if (anyElementsLeft) continue;

    while (pq.length > 0) result.push(pq.dequeue());
    return result;

    // result.push(pq.dequeue());
  }
};

let data = [
  [2, 4, 1, 2, 3],
  [25],
  [6, 3, 2],
  [66, 32, 4, 5, 6, 7, 22, 3],
  [4, 5, 6, 3, 2, 47, 54, 3],
];

console.log(sort(data));
