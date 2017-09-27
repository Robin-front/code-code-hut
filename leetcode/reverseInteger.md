# 11. [Reverse Integer](reverseInteger.md) 反转32位数字整型 _simple_

```
Reverse digits of an integer.

Example1: x = 123, return 321
Example2: x = -123, return -321

Note:
The input is assumed to be a 32-bit signed integer. Your function should return 0 when the reversed integer overflows.
```

不过这道题对 js 意义不是特别大，因为数字是 64位浮点数，并没有整型。
但是对于理解精度表示，符号位，指数位，尾数位，及位运算对 js 数值转换成 32 位整型运算 有帮助

```js
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    var result = 0, tail, newResult, int32max = Math.pow(2, 31)-1, int32min = -Math.pow(2, 31);

    while (x !== 0) { // 一边取余一边反转
        tail = x % 10;
        newResult = result * 10 + tail;
        if (newResult> int32max || newResult < int32min) { return 0;}
        result = newResult;
        x = (x/10)>>0;
    }

    return result;
};
```
一个更好的答案：

```js
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  let result = 0;
  let digit;
  let newResult;
  while (x !== 0) {
    digit = x % 10;
    newResult = (result * 10 + digit) | 0; // 位运算会进行 32 位整型转换的特性， 溢出将不相等
    if (((newResult - digit) / 10) !== result) {
      return 0;
    }
    result = newResult;
    x = (x - digit) / 10;
  }
  return result;
};
```

网络答案1：

```js
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    var INT_MAX = Math.pow(2,31)-1;    
    if(0 <= x && x < 10) return x;

    var nFlag = "";
    // x to string
    var str = x.toString();

    // reverse number string
    var rStr = str.split("").reverse().join(""); // 直接用数组 reverse

    // if x < 0, move '-'  from rStr back to front
    if(rStr.indexOf('-') != -1){
        rStr = '-' + rStr.replace('-','');    
    }

    var result = parseInt(rStr);

    if(result > INT_MAX || result < -(1+INT_MAX)) return 0;
    return result;
};
```
