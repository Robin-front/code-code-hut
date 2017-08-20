
# 7. [permute](permute.md) 对字符串进行全排列

递归思路：

```js
function permute(string) {
  return permuteArray(string.split(''));
}

function permuteArray(array) {
  switch (array.length) {
    case 0: return [];
    case 1: return array;
    default: return flatten(array.map(a => permuteArray(without(array, a)).map(b => a.concat(b))));
  }
}

function flatten(array) {
  return array.reduce((a, b) => a.concat(b), []);
}

function without(array, a) { // 去除 a
  let bs = array.slice(0);
  bs.splice(array.indexOf(a), 1);
  return bs;
}
```
