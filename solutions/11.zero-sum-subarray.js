// 11. Zero Sum Subarray
// Question: Given an array, write a function to find any subarray that sums to zero,
//   if one exists.
// Answer: https://www.byte-by-byte.com/zerosum/
// Keyword: Slope, Sum Diff, Graph of price

const zeroSum = (data) => {
  // Track movements in sum, find same elevation
  const runningSum = data.map((v, i) => (i === 0 ? v : v + data[i - 1]));

  const i = {};
  for (let j = 0; j < runningSum.length; j++) {
    const sum = runningSum[j];
    if (i[sum]) return data.slice(i[sum], j + 1);
    else i[sum] = j;
  }

  return [];
};

const res = zeroSum([1, 2, -5, 1, 2, -1]);
console.log(res);
assert(res.toString() === [2, -5, 1, 2].toString());
