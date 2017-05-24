// 归并排序
//
// 时间复杂度为O(nlogn).
//
// 归并排序中中两件事情要做：
//             第一： “分”,  就是将数组尽可能的分，一直分到原子级别。
//             第二： “并”，将原子级别的数两两合并排序，最后产生结果。

function merge(left, right){
  var result = [],
      iL = 0,
      iR = 0,
      lenL = left.length,
      lenR = right.length;

  while (iL < lenL && iR < lenR) { // 当任一下标达到最大时，表明其中一方已被比较完
    // 合并时，分别比较第一个数，如果较小，则push进result，并自增下标
    if(left[iL] < right[iR]){
      result.push(left[iL++]);
    } else {
      result.push(right[iR++]);
    }
  }
  // 将剩下的还未比较完的直接 全部压入result
  return result.concat(left.slice(iL), right.slice(iR));
}


function mergeSort(arr){
  var len = arr.length;
  if (len < 2){ // 划分到最小时，直接返回，开始merge
    return arr;
  }
  // '分'
  var mid = Math.floor(len/2),
      left = arr.slice(0, mid),
      right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

// console.log(mergeSort([123,23,4,341,2,4352,323,32,532,543,5,32,3,4,1,234,3,32]));
module.exports = mergeSort;
