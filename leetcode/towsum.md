
## [1. Two Sum](towsum.md) 给定一个数组和一个目标值，在数组中找出两个数的和为目标值，返回两个数的下标。  _simple_

```
example:
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```

这道题做出来不难，但是要做得与众不同还是要有独特的思路。

最简单的就是遍历，找嘛，一言不合就遍历：

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for(var i=0,len = nums.length; i<len;i++){
        for(var j=i+1;j<len;j++){
            if (nums[i]+nums[j] == target){
                return [i, j];
            }
        }
    }
};
```

so easy,但是，如果这样做就太普通了，谁想不到，时间复杂度为 O(n2); 想变为 O(n)有什么办法呢：

```js
var twoSum = function(nums, target) {
  var ans = [];
  var map = {};
  for (var i = 0; i < nums.length; i++) {
      if (map[target - nums[i]] !== undefined) {
          ans[0] = parseInt(map[target - nums[i]]) ;
          ans[1] = i;
          return ans;
      }
      map[nums[i]] = i;
  }
};
```

这里借用对象字面量，巧妙地对 ‘“是否存在另一个数” 与 “当前遍历的数” 的和为指定值’ 这个问题进行了判断。化 O(n2) 为 O(n), 一小步就是一大步。

> PS:对，我当时就没有这思路 :P
