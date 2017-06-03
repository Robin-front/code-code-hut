var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var bubbleSort = require('./BubbleSort.js');
var heapSort = require('./HeapSort.js');
var InsertSort = require('./InsertSort.js');
var mergeSort = require('./MergeSort.js');
var quickSort = require('./QuickSort.js');
var selectionSort = require('./SelectionSort.js');
var ShellSort = require('./ShellSort.js');

var random = function (min, max){
  return Math.ceil(Math.random() * (max - min +1)) + min;
}
var arr1 = [], arr2 = [], arr3 = [], arr4 = [], arr5 = [], arr6 = [], arr7 = [];
for (var i = 0; i < 10000; i++){
  arr1.push(random(1, 100000));
  arr2.push(random(1, 100000));
  arr3.push(random(1, 100000));
  arr4.push(random(1, 100000));
  arr5.push(random(1, 100000));
  arr6.push(random(1, 100000));
  arr7.push(random(1, 100000));
}

// console.log('arr', arr);
// 随机7个数组，互不干扰
// add tests
suite.add('冒泡排序', function() {
  bubbleSort(arr1);
})
.add('堆排序', function() {
  heapSort(arr2);
})
.add('插入排序', function() {
  InsertSort(arr3);
})
.add('归并排序', function() {
  mergeSort(arr4);
})
.add('快速排序', function() {
  quickSort(arr5);
})
.add('选择排序', function() {
  selectionSort(arr6);
})
.add('希尔排序', function() {
  ShellSort(arr7);
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });

// logs:
// => RegExp#test x 4,161,532 +-0.99% (59 cycles)
// => String#indexOf x 6,139,623 +-1.00% (131 cycles)
// => Fastest is String#indexOf
