
# 6. [ZigZag Conversion](ZigZagConversion.md) 蛇形转换 _medium_

example

```
input: "PAYPALISHIRING"
convert:
P   A   H   N
A P L S I I G
Y   I   R

print: "PAHNAPLSIIGYIR"
```

这题有点像找规律。XDD..

以下复杂度为 O(n)

```js
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    var len = s.length, result = '', i, j, cycleSize, repeatSize;
    if (numRows<=1||len<=numRows){return s;}
    cycleSize = (numRows-1)*2;
    for(i  = 0; i< numRows; i++){
        j = i;
        repeatSize = cycleSize-i*2;
        while(j < len){
            result += s[j];
            repeatSize = repeatSize>0 ? repeatSize:cycleSize-repeatSize;
            j += repeatSize;
            repeatSize = cycleSize-repeatSize;
        }
    }
    return result;
};
```
