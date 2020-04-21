// 43. Three Sum
// https://www.byte-by-byte.com/threesum/
// [Two Pointer][2Sum][3Sum][kSum]

const _binarySearch = (data, low, high, target) => {
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    const midElement = data[mid];
    if (target === midElement) return mid;
    if (target > midElement) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
};

const _oneSum = (data, target) => {
  const resultSet = [];
  if (!data) resultSet;
  const index = _binarySearch(data, 0, data.length, target);
  if (index >= 0) resultSet.push(data[index]);
  return resultSet;
};

const _twoSum = (data, target, beginIdx = 0) => {
  const resultSet = [];
  if (!data) resultSet;
  let low = beginIdx;
  let high = data.length - 1;
  while (low < high) {
    const sum = data[low] + data[high];
    if (sum === target) {
      resultSet.push([data[low], data[high]]);
      while (low < high && data[low] === data[low + 1]) low++; // skip low duplicates
      while (low < high && data[high] === data[high - 1]) high--; // skip high duplicates
      low++;
      high--;
    } // sum found
    else if (sum > target) high--;
    else low++;
  }
  return resultSet;
};

const _kSum = (data, k, target, beginIdx = 0) => {
  if (k < 1) return [];
  if (k === 1) return _oneSum(data, target, beginIdx);
  if (k === 2) return _twoSum(data, target, beginIdx);

  const resultSet = [];
  for (let i = beginIdx; i < data.length; i++) {
    const newTarget = target - data[i];
    _kSum(data, k - 1, newTarget, i + 1) // recursively solve for k-1
      .filter((s) => s.length > 0)
      .map((s) => [...s, data[i]])
      .forEach((s) => resultSet.push(s));

    // skip duplicates
    while (i < data.length && data[i] === data[i + 1]) i++;
  }
  return resultSet;
};

const kSum = (data, k, target) => {
  if (k <= 0) return [];
  // data needs to be sorted
  data.sort();
  return _kSum(data, k, target, 0);
};

const data = [1, 2, 3, -1, -2, -2, -2, -3, -3];
assert(kSum(data, 1, 7).length === 0);
assert(kSum(data, 1, 1).length === 1);
assert(kSum(data, 2, 0).length === 1);
assert(kSum(data, 3, 0).length === 2);
assert(kSum(data, 4, 0).length === 4);
