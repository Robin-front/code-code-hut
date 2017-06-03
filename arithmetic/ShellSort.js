// 希尔排序
//
// 希尔排序是对直接插入排序的优化，融入了一种叫做“缩小增量排序法”的思想


function shellSort(arr){
  var len = arr.length, step = len/2; // step 为增量，每次减半
  while (step >= 1) { // step为1时即是插入排序，此时已大大提高性能
    // console.log(step);
    step = Math.floor(step);
    for (var i = step; i < len; i++){
      var temp = arr[i], j;

      for(j = i-step; j >= 0 && temp < arr[j]; j -= step){ // 与前面第 step个比较，如果temp小，则交换，并继续与更前step个值相较，以此类推
        arr[j+step] = arr[j];
      }

      arr[j+step] = temp;
    }
    step /= 2;
  }
  // console.log('arr', arr);
  return arr;
}

// shellSort([1,4,5322,3,432,42,3,512,6245,643,6,73,3,45,41,536,31,343]);
module.exports = shellSort;
