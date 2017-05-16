// 每次找出最大值或最小值移到最右边
// 数据小时表现较好
// 优点：速度稳定，缺点：速度不快
var bubbleSort = function (arr){
  var i, j, count = arr.length -1, temp;
  for (i = 0;i < count; i++){
    // i可以理解为已排好的个数
    for (j = count; j > i; j--){
      // 从后往前冒泡，每次找出最小的数
      if (arr[j] < arr[j-1]){
        temp = arr[j];
        arr[j] = arr[j-1];
        arr[j-1] = temp;
      }
    }
  }
  return arr;
}
