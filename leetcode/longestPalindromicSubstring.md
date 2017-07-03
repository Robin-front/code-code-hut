## [Longest Palindromic Substring](longestPalindromicSubstring.md) 找出字符串中最长的回文字符串。  _medium_

Example:

```
Input: "babad"
Output: "bab"
Note: "aba" is also a valid answer.
```

Example:
```
Input: "cbbd"
Output: "bb"
```

```js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    var len = s.length, max = 1, start = 0, newLen = 0;
    if (len <= 1){ return s;}
    for (var i=0; i < len; i++){
        if ((len-i) <= max/2){ // 如果剩余长度不足max一半，那就不用再找了。
            break;
        }
        var j = i,
            k = i;
        while(k < len-1 && s[k] === s[k+1]){ // 连续相同字符，不管奇偶，可以直接跳过
            k++;
        }
        i = k;
        while(k<len-1 && j>0 && s[k+1] === s[j-1]){ // 回文条件
            k++;
            j--;
    	}
        newLen = k-j+1;
        if (newLen > max){
            max = newLen;
            start = j;
        }

    }
    return s.substr(start, max);
};
```
