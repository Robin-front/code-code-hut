// 直接插入排序

function insertSort(arr){
  var len = arr.length, i = 1, temp, j;
  for (; i < len; i++){
    temp = arr[i]; //从第二位开始取数
    for(j = i-1; j >= 0 && arr[j] > temp; j--){ // 倒序遍历有序部分，如果当前遍历值较大，则后移；
      arr[j+1] = arr[j];
    }
    arr[j+1] = temp; // 否则跳出循环,将待比较值插入
  }
  // console.log('arr', arr);
  return arr;
}

insertSort([24,667,584,3,45,3,7,6,56,2,1,67,564,7,6,45,3,34,3,5,345])
