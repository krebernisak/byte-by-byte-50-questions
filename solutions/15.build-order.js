// 15. Build order
// Question: Given a list of packages that need to be built and the dependencies for
//   each package, determine a valid order in which to build the packages.
// Answer:  https://www.byte-by-byte.com/buildorder/
// Tags: [DFS][Topological Sort]
// Recursive and iterative DFS with + (cycle detection) and * (processed) marks

const buildOrder_recursion = (processes) => {
  const order = [];
  if (!processes) return order;

  const visited = new Array(processes.length).fill(false);
  const stack = [];

  const _visit = (curr) => {
    if (visited[curr]) return;

    stack.push(curr);
    visited[curr] = true;

    // check for cycles in current sub-graph
    let dependencies = processes[curr];
    if (dependencies.some(stack.includes.bind(stack)))
      throw Error(`Cycle: stack=[${stack}] dependencies=[${dependencies}]`);

    // process dependencies
    dependencies.forEach(_visit);
    order.push(stack.pop());
  };

  processes.forEach((_, i) => _visit(i));
  return order;
};

const buildOrder_iteration = (processes) => {
  const order = [];
  if (!processes) return order;

  const visited = new Array(processes.length).fill(false);

  for (let i = 0; i < processes.length && !visited[i]; i++) {
    const stack = [i];
    while (stack.length > 0) {
      let curr = stack[stack.length - 1];
      visited[curr] = true;

      // check for cycles in current sub-graph
      let dependencies = processes[curr];
      if (dependencies.some(stack.includes.bind(stack)))
        throw Error(`Cycle: stack=[${stack}] dependencies=[${dependencies}]`);

      // process non-visited dependencies
      let nonVisitedDependencies = dependencies.filter((d) => !visited[d]);
      if (nonVisitedDependencies.length === 0) order.push(stack.pop());

      stack.push(...nonVisitedDependencies);
    }
  }

  return order;
};

// test helper
const isTopologicalOrderCorrect = (dependencies, order) => {
  if (order.length !== dependencies.length) return false;
  const visited = new Array(dependencies.length).fill(false);
  for (let i = 0; i < order.length; i++) {
    let p = order[i];
    visited[p] = true;
    let allVisited = dependencies[p].every((d) => visited[d]);
    if (!allVisited) return false;
  }
  return true;
};

const tests = [
  [],
  [[]],
  [[], [0]],
  [[], [0], [0], [1, 2], [3]],
  [[1], [2, 3], [4], [4], []],
];
const functions = [buildOrder_recursion, buildOrder_iteration];

tests.forEach((v) => {
  functions.forEach((f) => {
    const res = f(v);
    console.assert(
      isTopologicalOrderCorrect(v, res),
      `Function ${f.name} failed for [${v}] case [Expected: ${v[1]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
