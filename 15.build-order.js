// Recursive and iterative DFS with + (cycle detection) and * (processed) marks

const tests = [[[[], [0], [0], [1, 2], [3]], [0, 1, 2, 3, 4]]];
const functions = [buildorder1];

tests.forEach((v, i) => {
  functions.forEach(f => {
    const res = f(v[0]);
    console.assert(
      res === v[1],
      `Function ${f.name} failed for [${v}] case [Expected: ${
        v[1]
      }, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
