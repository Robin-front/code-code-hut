

## [Longest Substring Without Repeating Characters](longestsubstringlength.md) 找出字符串中连续的不包含重复字母的最长字符串长度。  _medium_

一个方法是把字符串切成多段不重复的字符串，然后找出其他最长的字符串。
一个方法是边遍历边累计。

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    var map = {}; // 用于更新重复字母的下标
    var left = 0; // 当前不重复字符串的开头

    return s.split('').reduce((max, v, i) => { // max为目前找到的最长的字符串长度
        left = map[v] >= left ? map[v] + 1 : left;
        map[v] = i;
        return Math.max(max, i - left + 1);
    }, 0);
};
```

数组操作可能慢点，直接用 for循环：

```js
var lengthOfLongestSubstring = function(s) {
    if(s.length==0){
        return 0
    }
    var obj={}
    var max=1
    for(var i=j=0;j<s.length;j++){
        if(s[j] in obj){
            max=Math.max(max,j-i)
            i=Math.max(i,obj[s[j]]+1)
        }
        obj[s[j]]=j
    }
    max=Math.max(max,j-i)
    return max
};
```
