
14. [compareObject](compareObject.md) 比较两个对象，返回值不同的 key.

```js
const a = {a:1, b: 2, c:{d:1}}
const b = {a: 1, b: 2, c:{d:2}}
compareObject(a, b);
// => ['c.d'] [[c,d], [c,e]] [a, [c]]  [a,b,c,d]
```


case 1: 只比较两者都有的 key

```js
function compareObj(obj1, obj2){
  var keys = Object.keys(obj1);
  var result = [];
  keys.forEach(function (key){
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object'){
      var children = compareObj(obj1[key], obj2[key]);
      if (children !== true) {
        children = children.map(function (i){
          return key + '.' + i;
        });
        result = result.concat(children);
      }
    }else if (obj2[key] !== undefined && obj1[key] !== obj2[key]) {
      result.push(key);
    }
  });
  return !result.length ? true : result;
}
```

case 2: 以 obj1 的 key 为基准

```js
// 去掉 obj2[key] 是否存在的判断就好了
// obj2[key] !== undefined
```

case 3:  比较所有 key

```js

function merge(keys1, keys2){
  var keys = [].concat(keys1);
  keys2.forEach(function (i){
    if (keys.indexOf(i) === -1){
      keys.push(i);
    }
  });
  return keys;
}

function compareObj(obj1, obj2){
  var keys1 = Object.keys(obj1);
  var keys2 = Object.keys(obj2);
  var keys = merge(keys1, keys2);
  var result = [];
  keys.forEach(function (key){
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object'){
      var children = compareObj(obj1[key], obj2[key]);
      if (children !== true) {
        children = children.map(function (i){
          return key + '.' + i;
        });
        result = result.concat(children);
      }
    }else if (obj1[key] !== obj2[key]) {
      result.push(key);
    }
  });
  return !result.length ? true : result;
}
```
