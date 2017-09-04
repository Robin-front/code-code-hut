
# [flowerbed](flowerbed.md) 种花 _simple_

## description

一个长条花坛里有若干并排的花槽，有些花槽中已经种了花，有些则还没种花。然而，不能将两株花种在相邻的花槽否则它们会争夺水分导致两者都枯萎。给定一个花坛的种植情况flowerbed（一个包含0和1的数组，0表示该花槽为空，1表示该花槽已经种了花），以及一个数n，问是否可以再种下新的n株花且满足相邻花槽不能同时种花的条件。

## sample

样例 1
输入： `flowerbed = [1,0,0,0,1], n = 1`
输出： `True`
样例 2
输入： `flowerbed = [1,0,0,0,1], n = 2`
输出： `False`
>注意
输入数组本身满足相邻花槽不同时种花的条件。
输入数组的长度范围为[1, 20000]。
n是非负整数且大小不会超过输入数组的长度。


```js

function canPlaceFlowers(flowerbed, n) {
  var len = flowerbed.length, count = 0;
  if (len <= 2 && n === 1) { return true;}
  for(var i = 0; i < len;) {
    if (flowerbed[i] === 1) {
      i+=2; // 跳跃检测
    }else if (flowerbed[i] === 0 && (i === 0 || flowerbed[i+1] === 0) && (i === len-1 || flowerbed[i-1] === 0)) {
      flowerbed[i] = 1;
      count++;
      i+=2;
      if (count >= n) {
        return true;
      }
    } else {
      i++;
    }
  }
  return false;
}

```
