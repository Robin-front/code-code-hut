
8. [increase](increase.md) 模拟二进制自增

```js
function increase(num){
  num = String(num).split('');
  var i;
  for (i = num.length -1; i>=0; i--){
    if (num[i] == 1){ num[i] = 0; continue; }
    num[i]++;
    break;
  }
  if (i<0){
    num.unshift(1);
  }
  return num.join('');
}

// increase(111); // 1000
// increase(1000); // 1001
// increase(1001); // 1010
```
