/**
 * 7. Square Submatrix
 * Question: Given a 2D array of 1s and 0s, find the largest square subarray of all 1s.
 * Answer: https://www.byte-by-byte.com/squaresubmatrix/
 * Tags: [Recursion][DP]
 */

const findBiggestSquareSubmatrix_topDown = (data) => {
  let max = 0;
  const cache = Array(data.length)
    .fill()
    .map((_) => Array(data[0].length).fill(0));

  // We explore down and to the right until we go out of bound or find a 0
  const _self = (i, j) => {
    if (i >= data.length || j >= data[0].length) return 0;
    if (data[i][j] === 0) return 0;
    if (cache[i][j]) return cache[i][j];
    return (cache[i][j] =
      1 + // this cell
      Math.min(
        // explore down and right
        _self(i + 1, j),
        _self(i, j + 1),
        _self(i + 1, j + 1)
      ));
  };

  // We need to explore all cells
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      max = Math.max(max, _self(i, j));
    }
  }

  return max;
};

const findBiggestSquareSubmatrix_bottomUp = (data) => {
  let max = 0;
  const cache = Array(data.length)
    .fill(0)
    .map((_) => Array(data[0].length).fill(0));

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      // If we are in the first row or column then the value is just
      // 1 if that cell is true and 0 otherwise. In other rows and
      // columns, need to look up and to the left
      if (data[i][j] === 0) continue;
      if (i === 0 || j === 0) cache[i][j] = 1;
      else {
        cache[i][j] =
          1 + // this cell
          Math.min(
            // explore up and left
            cache[i - 1][j],
            cache[i][j - 1],
            cache[i - 1][j - 1]
          );
        max = Math.max(max, cache[i][j]);
      }
    }
  }

  return max;
};

const matrix = [
  [0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0],
  [1, 1, 1, 1, 0],
  [1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0],
];

// solution visualization
const cache = [
  [0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0],
  [1, 2, 2, 2, 0],
  [1, 2, 3, 0, 0],
  [0, 0, 0, 0, 0],
];

assert(findBiggestSquareSubmatrix_topDown(matrix) === 3);
assert(findBiggestSquareSubmatrix_bottomUp(matrix) === 3);
