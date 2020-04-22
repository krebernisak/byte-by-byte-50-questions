// 16. Shortest Path
// Question: Given a directed graph, find the shortest path between two nodes if one exists.
// Answer: https://www.byte-by-byte.com/shortestpath/
// Tags: [Graph][BFS]

class DirectedGraph {
  constructor() {
    this.graph = new Map();
  }

  addVertex(v) {
    if (!this.graph.has(v)) this.graph.set(v, []);
    else throw new Error("Duplicate");
  }

  addEdge(v, w) {
    if (!this.graph.has(v)) throw new Error(`Vertex ${v} doesn't exists`);
    if (!this.graph.has(w)) throw new Error(`Vertex ${w} doesn't exists`);
    let adjList = this.graph.get(v);
    if (!adjList.includes(w)) adjList.push(w);
  }

  shortestPath(a, b) {
    if (!a || !b) return null;
    if (a === b) return [];
    // Remember parent for each node we visit
    const parents = new Map();
    // Start DFS from node a
    const queue = [a];
    // While we do not find a destination node (b)
    while (queue.length > 0) {
      let node = queue.shift();
      // If we find the node we're looking for then we're done
      if (node === b) break;
      let adjList = this.graph.get(node);
      // Add all the children to the queue
      adjList.forEach((v) => {
        // Skip visited
        if (!parents.has(v)) {
          queue.push(v);
          parents.set(v, node);
        }
      });
    }

    // If we couldn't find a path, the destination node won't have been
    // added to our parents set
    if (!parents.has(b)) return null;

    const out = [];
    let node = b;
    while (node) {
      out.unshift(node);
      node = parents.get(node);
    }
    return out;
  }
}

// Simple test helper
const test_shortestPath = (vertices, edges, path) => {
  const g = new DirectedGraph();
  vertices.forEach((v) => g.addVertex(v));
  edges.forEach((v) => g.addEdge(v[0], v[1]));
  const res = g.shortestPath(path[0], path[1]);
  return !!res ? res.join("") : res;
};

const tests = [
  [
    ["A", "B", "C", "D"],
    [
      ["A", "D"],
      ["A", "C"],
      ["B", "C"],
      ["C", "D"],
    ],
    [],
    null,
  ],
  [
    ["A", "B", "C", "D"],
    [
      ["A", "D"],
      ["A", "C"],
      ["B", "C"],
      ["C", "D"],
    ],
    ["A", null],
    null,
  ],
  [
    ["A", "B", "C", "D"],
    [
      ["A", "D"],
      ["A", "C"],
      ["B", "C"],
      ["C", "D"],
    ],
    ["A", "A"],
    "",
  ],
  [
    ["A", "B", "C", "D"],
    [
      ["A", "D"],
      ["A", "C"],
      ["B", "C"],
      ["C", "D"],
    ],
    ["A", "E"],
    null,
  ],
  [
    ["A", "B", "C", "D"],
    [
      ["A", "D"],
      ["A", "C"],
      ["B", "C"],
      ["C", "D"],
    ],
    ["A", "C"],
    "AC",
  ],
  [
    ["A", "B", "C", "D"],
    [
      ["A", "B"],
      ["A", "C"],
      ["B", "C"],
      ["C", "D"],
    ],
    ["A", "D"],
    "ACD",
  ],
];
const functions = [test_shortestPath];

tests.forEach((v, i) => {
  functions.forEach((f) => {
    const res = f(v[0], v[1], v[2]);
    console.assert(
      res === v[3],
      `Function ${f.name} failed for [${v}] case [Expected: ${v[3]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
