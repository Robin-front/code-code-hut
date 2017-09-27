# 13. [Palindrome Number](palindromeNumber.md) 判断回文数字 _simple_

```
负数不是回文；
如果想着转换成字符串，记住尽可能少地使用额外的空间；
你可以尝试反转整数，如果你已经做过 reverse Integer 那道题，那你应该知道可能会造成溢出，该如何处理呢？
不管怎样，都有更优雅的方式解决这个问题。
```

很遗憾，我在不要使用额外空间和数字溢出问题上纠结，并没有想出很好的方法，这是他人的解决方案。

```js
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x<0|| (x!===0&& x%10===0)) { // 0 结尾或负数 不是回文数字
      return false;
    }
    if (x<10) { return true; }
    var temp = 0;

    while (x>temp) { // 只需要反转一半，然后比较
      temp = temp*10 + x%10;
      x = Math.floor(x/10);
    }

    return (temp===x)||(x===Math.floor(temp/10)); // 存在奇偶回文数字
};
```
