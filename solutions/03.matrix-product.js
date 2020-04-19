// 3. Matrix product
// https://www.byte-by-byte.com/matrixproduct/
// [Array]

const getProduct = (data) => data.reduce((acc, val) => acc * val, 1);

const matrixproduct = (matrix) => {
  const product = matrix.map((arr) => new Array(arr.length).fill([1, 1]));
  const min = (i, j) => product[i][j][0];
  const max = (i, j) => product[i][j][1];
  const setProduct = (i, j, candidates) =>
    (product[i][j] = [Math.min(...candidates), Math.max(...candidates)]);

  product[0][0] = [matrix[0][0], matrix[0][0]];
  for (let i = 1; i < product.length; i++) {
    const candidates = [
      matrix[i][0] * min(i - 1, 0),
      matrix[i][0] * max(i - 1, 0),
    ]; // min === max
    setProduct(i, 0, candidates);
  }
  for (let j = 1; j < product[0].length; j++) {
    const candidates = [
      matrix[0][j] * min(0, j - 1),
      matrix[0][j] * max(0, j - 1),
    ]; // min === max
    setProduct(0, j, candidates);
  }

  for (let i = 1; i < product.length; i++) {
    for (let j = 1; j < product[i].length; j++) {
      // we look at current number and both extremes from two directions (up/left), to find new extremes
      const extremes = [
        min(i - 1, j), // up min
        max(i - 1, j), // up max
        min(i, j - 1), // left min
        max(i, j - 1), // left max
      ];
      const candidates = extremes.map((val) => val * matrix[i][j]);
      setProduct(i, j, candidates);
    }
  }

  return product[product.length - 1][product[0].length - 1][1];
};

const test_matrixproduct = (matrix, expectedPath, expectedProduct) => {
  const max = matrixproduct(matrix);
  // TODO: test path
  return max === expectedProduct ? true : max;
};

const tests = [
  [
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    [1, 4, 7, 8, 9],
    2016,
  ],
  [
    [
      [-1, 2, 3],
      [4, 5, -6],
      [7, 8, 9],
    ],
    [-1, 4, 5, -6, 9],
    1080,
  ],
];
const functions = [test_matrixproduct];

tests.forEach((v, i) => {
  functions.forEach((f) => {
    const res = f(v[0], v[1], v[2]);
    console.assert(
      res === true,
      `Function ${f.name} failed for [${v}] case [Expected: ${v[1]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
