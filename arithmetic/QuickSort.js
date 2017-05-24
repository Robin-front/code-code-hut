// 快速排序
//优点： 快，对于完全乱序，很适合
//数据大时表现较好
function quickSort(arr, left, right){
  left = (left === undefined ? 0 : left), right = (right === undefined ? arr.length-1 : right);

  if (left < right) {
    // 获得一个 中间数坐标
    var i = Division(arr, left, right);
    // 递归左边
    quickSort(arr, left, i-1);
    // 递归右边
    quickSort(arr, i+1, right);
  }
  // console.log('arr', arr);
}

function Division (arr, left, right){
  // 取中间基数
  var baseNum = arr[left];
  while (left < right) { // 循环体，直到左右指针重合
    // 遍历右边，直到找到比基数小的数
    while (left < right && arr[right] >= baseNum) {
      right--;
    }
    // 找到，赋值给左边
    arr[left] = arr[right];

    // 遍历左边，直到找到比基数大的数
    while(left < right && arr[left] <= baseNum){
      left++;
    }
    // 赋值给右边刚刚的位置
    arr[right] = arr[left]
  }

  // 基数放置在左边，至此，left左边比left小，left右边比left大
  arr[left] = baseNum;
  return left;
}

// console.log('begin');
// quickSort([123,141,45,324,234,43,76,5,435,234,66,34,6,3,43,156,332]);
module.exports = quickSort;
