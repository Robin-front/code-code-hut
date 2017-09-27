
# 12. [String to Integer (atoi)](stringToInteger.md) 字符串转数字 _simple_

这个是挺简单的，可能是一开始我没完全看懂题，使用了正则。

```
除了空格，首先出现的必须是数字或正负号，不能是其他字符，尽可能多地转换连续的数字。
超过 32 位整型范围的值返回 边界值，不能转换的 return 0;
```

```js
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    var digital = str.match(/^\s*([\+\-]?\d+)/);
    var INT_MAX = Math.pow(2, 31);
    digital = digital && digital[1];

    if (digital) {
        if (digital > INT_MAX-1) {
            return INT_MAX-1;
        }
        if (digital < -INT_MAX) {
            return -INT_MAX;
        }
        return Number(digital);
    }
    return 0;
};
```

使用 parseInt 更简单，其实就是一个外观模式。

```js
**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    var num = parseInt(str, 10),
        INT_MAX = 2147483648;
    if (isNaN(num)){
        return 0;
    } else if (num > INT_MAX-1){
        return INT_MAX-1;
    } else if (num < -INT_MAX){
        return -INT_MAX;
    }
    return num;
};
```
