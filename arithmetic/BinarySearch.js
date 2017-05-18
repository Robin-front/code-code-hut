// 折半查找
//
// 这种查找有两个缺点：
// - 第一： 数组必须有序，不是有序就必须让其有序，大家也知道最快的排序也是NLogN的。
// - 第二： 这种查找只限于线性的顺序存储结构。
//
// 折半无序（用快排活堆排）的时间复杂度：O(NlogN)+O(logN);
//  折半有序的时间复杂度：O(logN);

function binarySearch(arr, key){
  var len = arr.length, min, max, mid;
  min = 0;
  max = len-1;
  while (min <= max) {
    mid = Math.floor((min+max)/2);

    if (arr[mid] > key){
      max = mid - 1;
    } else if (arr[mid] < key){
      min = mid + 1;
    } else {
      return mid;
    }
  }

  return -1;

}

// console.log(binarySearch([1,2,3,5,6,8,9,12,15,16,25,36,57,69], 17));
