// 45. Autocomplete
// https://www.byte-by-byte.com/autocomplete/
// [String][Trie]

class Node {
  constructor(val, isWord) {
    this.val = val;
    this.isWord = isWord;
    this.children = {};
  }
}

class Autocomplete {
  constructor() {
    this.trie = new Node("", false);
  }
  index = (dict) => (dict || []).forEach(this.insert);
  insert = (w) => {
    let node = this.trie;
    for (let i = 0; i < w.length; i++) {
      const [val, isWord] = [w[i], w.length === i + 1];
      if (!node.children[val]) node.children[val] = new Node(val, isWord);
      else if (isWord) node.children[val].isWord = isWord;
      node = node.children[val];
    }
  };
  search = (q) => {
    if (!q) return [];
    const res = [];
    // BFS starting from the trie root
    const queue = [[this.trie, "", -1]];
    while (queue.length > 0) {
      let [node, str, count] = queue.shift();
      [str, count] = [str + node.val, count + 1];
      if (node.isWord && str.length >= q.length) res.push(str);
      Object.values(node.children)
        .filter((n) => count >= q.length || n.val === q[count])
        .forEach((n) => queue.push([n, str, count]));
    }
    return res;
  };
  print = () => console.log(JSON.stringify(this.trie, "", 2));
}

// Test helper
const test_autocomplete = (dict, q, expected) => {
  const db = new Autocomplete();
  db.index(dict);
  db.print();
  const res = db.search(q);
  const isExpected = expected.sort().join("") === res.sort().join("");
  return isExpected ? true : res;
};

const dict = ["anna", "auto", "automatic", "cat", "car", "canister"];
const tests = [
  [dict, "", []],
  [dict, "s", []],
  [dict, "a", ["anna", "auto", "automatic"]],
  [dict, "au", ["auto", "automatic"]],
  [dict, "aut", ["auto", "automatic"]],
  [dict, "auto", ["auto", "automatic"]],
  [dict, "autom", ["automatic"]],
  [dict, "automo", [""]],
  [dict, "c", ["cat", "car", "canister"]],
  [dict, "ca", ["cat", "car", "canister"]],
  [dict, "cat", ["cat"]],
  [dict, "catt", []],
  [dict, "can", ["canister"]],
  [dict, "cant", []],
];
const functions = [test_autocomplete];

tests.forEach((v) => {
  functions.forEach((f) => {
    const res = f(v[0], v[1], v[2]);
    console.assert(
      res === true,
      `Function ${f.name} failed for [${v}] case [Expected: ${v[2]}, Got: ${res}]`
    );
  });
});

console.log("Tests Finished");
