// 顺序查找

// 没啥，就一个个找
// 线性查找时间复杂度：O(n);
function (arr, key){
  var i = 0, len = arr.length;
  for(; i < len; i++){
    if (arr[i] === key){
      return i;
    }
  }
  return -1;
}
