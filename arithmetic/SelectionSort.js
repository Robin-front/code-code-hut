// 直接选择排序
// 感觉和冒泡有点像，但关注点不一样，一个是两两比较，这个是寻找最小值下标
// 缺点： 慢， 数据小时表现较好

var SelectionSort = function (arr){
  var min, temp; // min 为目前最小值下标
  for (var i = 0, len = arr.length; i < len-1; i++){
    min = i;
    for (var j = i+1; j < len; j++ ){
      if (arr[j] < arr[min]){
        min = j; //找到最小值，更新下标
      }
    }
    // 将最小值替换到前面
    temp = arr[i];
    arr[i] = arr[min];
    arr[min] = temp;
  }
  console.log('arr', arr);
  return arr;
}

SelectionSort([32,25,4,457,32,6732,73,25,3,322,82,23]);
