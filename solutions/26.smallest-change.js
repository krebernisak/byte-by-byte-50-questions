/**
 * 26. Smallest Change
 * Question: Given an input amount of change x, write a function to determine the minimum number of coins required to make that amount of change.
 * Answer: https://www.byte-by-byte.com/smallestchange/
 * Tags: [Recursion][DP]
 */

// accept only positive coins
const onlyPositive = (coins) => (coins || []).filter((c) => c > 0);

const change_naive = (target, coins) => {
  coins = onlyPositive(coins);
  if (target === 0 || !coins.length) return 0;

  let min = Number.MAX_SAFE_INTEGER;
  for (let c of coins) {
    const newTarget = target - c;
    if (newTarget < 0) continue;
    const num = change_naive(newTarget, coins);
    if (num < 0) continue;
    min = Math.min(min, num + 1);
  }
  return min !== Number.MAX_SAFE_INTEGER ? min : -1;
};

const change_topDown = (target, coins) => {
  coins = onlyPositive(coins);
  if (target === 0 || !coins.length) return 0;

  const cache = Array(target + 1).fill(-1);

  const _self = (_target) => {
    if (_target === 0) return 0;
    if (cache[_target] >= 0) return cache[_target];

    let min = Number.MAX_SAFE_INTEGER;
    for (let c of coins) {
      const newTarget = _target - c;
      if (newTarget < 0) continue;
      const num = _self(newTarget);
      if (num < 0) continue;
      cache[newTarget] = num;
      min = Math.min(min, num + 1);
    }

    return min !== Number.MAX_SAFE_INTEGER ? min : -1;
  };

  return _self(target);
};

const change_bottomUp = (target, coins) => {
  coins = onlyPositive(coins);
  if (target === 0 || !coins.length) return 0;

  // Init cache
  const cache = Array(target + 1)
    .fill()
    .map(() => Array(coins.length + 1).fill(-1));
  for (let j = 1; j <= coins.length; j++) cache[0][j] = 0;

  // Start the calculation
  for (let i = 1; i <= target; i++) {
    for (let j = 1; j <= coins.length; j++) {
      const c = coins[j - 1];
      const newTarget = i - c; // current target - current coin
      if (newTarget >= 0) {
        const take = cache[newTarget][j] + 1;
        const notTake = cache[i][j - 1];
        if (notTake < 0 && take <= 0) cache[i][j] = -1;
        else if (take <= 0 && notTake >= 0) cache[i][j] = notTake;
        else if (take > 0 && notTake < 0) cache[i][j] = take;
        else cache[i][j] = Math.min(take, notTake);
      } else cache[i][j] = cache[i][j - 1]; // can not take coin
    }
  }

  // return end result considering total target and all coins
  return cache[target][coins.length];
};

const target = 7;
const coins = [1, 2, 5, 10];
//       0[-1, 0, 0, 0, 0];
//       1[-1, 1, 1, 1, 1];
//       2[-1, 2, 1, 1, 1];
//       3[-1, 3, 2, 2, 2];
//       4[-1, 4, 2, 2, 2];
//       5[-1, 5, 3, 1, 1];
//       6[-1, 6, 3, 2, 2];
//       7[-1, 7, 4, 2, 2];
//                      ^ RESULT
assert(change_naive(target, coins) === 2);
assert(change_topDown(target, coins) === 2);
assert(change_bottomUp(target, coins) === 2);

assert(change_naive(7, [2]) === -1);
assert(change_topDown(7, [2]) === -1);
assert(change_bottomUp(7, [2]) === -1);
