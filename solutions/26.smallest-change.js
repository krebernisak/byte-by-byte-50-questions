// 26. Smallest Change
// Question: Given an input amount of change x, write a function to determine the minimum number of coins required to make that amount of change.
// Answer: https://www.byte-by-byte.com/smallestchange/
// Tags: [Recursion][DP]

// accept only positive coins
const onlyPositive = (coins) => (coins || []).filter((c) => c > 0);

const change_Naive = (target, coins) => {
  coins = onlyPositive(coins);
  if (target === 0 || !coins.length) return 0;

  let min = Number.MAX_SAFE_INTEGER;
  for (let c of coins) {
    const newTarget = target - c;
    if (newTarget < 0) continue;
    const num = change_Naive(newTarget, coins);
    min = Math.min(min, num + 1);
  }
  return min;
};

const change_TopBottom = (target, coins) => {
  coins = onlyPositive(coins);
  if (target === 0 || !coins.length) return 0;

  const cache = Array(target + 1).fill(-1);

  const _self = (_target) => {
    if (cache[_target] >= 0) return cache[_target];

    let min = Number.MAX_SAFE_INTEGER;
    for (let c of coins) {
      const newTarget = _target - c;
      if (newTarget < 0) continue;
      const num = _self(newTarget);
      cache[newTarget] = num;
      min = Math.min(min, num + 1);
    }
    return min !== Number.MAX_SAFE_INTEGER ? min : 0;
  };

  return _self(target);
};

const change_BottomUp = (target, coins) => {
  coins = onlyPositive(coins);
  if (target === 0 || !coins.length) return 0;

  const cache = Array(target + 1)
    .fill()
    .map(() => Array(coins.length + 1).fill(0));

  for (let i = 0; i <= target; i++) {
    for (let j = 0; j <= coins.length; j++) {
      if (i === 0 || j === 0) {
        cache[i][j] = i;
        continue;
      }

      const c = coins[j - 1];
      const newTarget = i - c; // current target - current coin
      if (newTarget >= 0) {
        const take = cache[newTarget][j] + 1;
        const notTake = cache[i][j - 1];
        cache[i][j] = Math.min(take, notTake);
      } else cache[i][j] = cache[i][j - 1]; // can not take coin
    }
  }

  // return end result considering total target and all coins
  return cache[target][coins.length];
};

const target = 7;
const coins = [1, 2, 5, 10];
//        0[0, 0, 0, 0, 0];
//        1[1, 1, 1, 1, 1];
//        2[2, 2, 1, 1, 1];
//        3[3, 3, 2, 2, 2];
//        4[4, 4, 2, 2, 2];
//        5[5, 5, 3, 1, 1];
//        6[6, 6, 3, 2, 2];
//        7[7, 7, 4, 2, 2];
//                      ^ RESULT
assert(change_Naive(target, coins) === 2);
assert(change_TopBottom(target, coins) === 2);
assert(change_BottomUp(target, coins) === 2);
