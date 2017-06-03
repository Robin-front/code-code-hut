// 堆排序

// 应用场景：对于找最大值或最小值时，更快。找最大值，则用最大堆，找最小值用最小堆。
// 整体效率比快排差一点
// http://bubkoo.com/2014/01/14/sort-algorithm/heap-sort/

// 堆（二叉堆）可以视为一棵完全的二叉树，完全二叉树的一个“优秀”的性质是，除了最底层之外，每一层都是满的，这使得堆可以利用数组来表示（普通的一般的二叉树通常用链表作为基本容器表示），每一个结点对应数组中的一个元素。

// 完全二叉树：深度为 k，有 n 个节点的二叉树，当且仅当其每一个节点都与深度为 k 的满二叉树中序号为 1 至 n 的节点对应时，称之为完全二叉树

// 堆排序原理
// 堆排序就是把最大堆堆顶的最大数取出，将剩余的堆继续调整为最大堆，再次将堆顶的最大数取出，这个过程持续到剩余数只有一个时结束。在堆中定义以下几种操作：
// 最大堆调整（Max-Heapify）：将堆的末端子节点作调整，使得子节点永远小于父节点
// 创建最大堆（Build-Max-Heap）：将堆所有数据重新排序，使其成为最大堆
// 堆排序（Heap-Sort）：移除位在第一个数据的根节点，并做最大堆调整的递归运算

function heapSort(array){

  function swap(arr, i, j){
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  function maxHeapify(arr, index, heapSize){
    var iMax, iLeft, iRight;
    while(true){
      iMax = index;
      iLeft = 2*iMax+1; // 左子节点下标，（注意，父节点从0开始）
      iRight =2*(iMax+1); // 右子节点下标

      if(iLeft < heapSize && array[iLeft] > array[iMax]) {
        iMax = iLeft;
      }

      if (iRight < heapSize && array[iRight] > array[iMax]) {
        iMax = iRight;
      }

      if (iMax != index){ // 如果原顶点不是最大，则进行交换
        swap(arr, iMax, index);
        index = iMax; // 并且将与顶点交换的子节点进行递归操作
      } else {
        break;
      }
    }
  }

  function buildMaxHeap(array){
    var i, iParent = Math.floor((array.length-1)/2);

    for(i = iParent; i >= 0; i--){
      // 从最后一个堆往上排，让每个堆的父节点最大
      maxHeapify(array, i, array.length);
    }
  }

  function sort(array){
    // 首次堆排序，找出最大值（即顶点）
    buildMaxHeap(array);

    for(var i = array.length -1; i > 0; i--){
      // 将最大值放在最后
      swap(array, 0, i);
      // 排除此次最大值，将剩下的值再次进行堆排序，找出最大值
      maxHeapify(array, 0, i);
    }
    // console.log('array', array);
    return array;
  }

  return sort(array);
}

module.exports = heapSort;

// heapSort([231,34,2,32,52,634,2,45,34,645,3,1,464,234,743,23]);
