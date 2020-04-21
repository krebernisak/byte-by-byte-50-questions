// 34. Swap Variables
// Question: Given two integers, write a function that swaps them without using any temporary variables.
// Answer: https://www.byte-by-byte.com/swapvariables/
// Tags: [Bitwise]

// https://medium.com/better-programming/how-swap-two-values-without-temporary-variables-using-javascript-8bb28f96b5f6

// Solutions for Numbers

a = 5;
b = 6;

console.log(a, b);

a = a + b;
b = a - b;
a = a - b;

console.log(a, b);

a = a ^ b;
b = a ^ b;
a = a ^ b;

console.log(a, b);

a = b + ((b = a), 0);

console.log(a, b);

b = a + (a = b) - b;

console.log(a, b);

a = a ^ b ^ (b ^= a ^ b);

console.log(a, b);

// Solutions for All Types

a = [b, (b = a)][0];

console.log(a, b);

b = ((a) => a)(a, (a = b));

console.log(a, b);

[a, b] = [b, a];

console.log(a, b);
