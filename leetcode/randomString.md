
version 1:

```javascript
var random = Math.random().toString().substring(2);

while (/(\d+)(\d{2})/.test(random)){
  random = random.replace(/(\d+)(\d{2})/, '$1' + ',' + '$2');
}

random.split(',').reduce(function(string, num) {
  var num = Number(num)%36;
  num = num < 10 ? num+10 : num;
  return string += (num).toString(36);
}, '');
```

上面只是尝试，下面是优化
version 2:


```js
function randomString(length) {
  var str = '';

  while(length--){
    var random = Math.round(Math.random()*100)%36;
    random = random < 10 ? random + 10 : random; // 如果可以包含数字，就把这行注释
    str += random.toString(36);
  }

  return str;
}
```

嗯，还有个问题，前10个字符机率翻倍
version 3:

```js

function randomString(length) {
  var str = '';

  while(length--){
    var random = Math.round(Math.random()*100)%36;
    if (random < 10) {
      length++;
      continue;
    }
    str += random.toString(36);
  }

  return str;
}

```
