## 算法

### 七大经典排序

- 交换排序： 包括[冒泡排序](BubbleSort.js)，[快速排序](QuickSort.js)
- 选择排序： 包括[直接选择排序](SelectionSort.js)，[堆排序](HeapSort.js)
- 插入排序： 包括[直接插入排序](InsertSort.js)，[希尔排序](ShellSort.js)
- 合并排序： [归并排序](MergeSort.js)

[附排序可视化参考](http://jsdo.it/norahiko/oxIy/fullscreen)

### 五大经典查找

- 线性查找: 分为[顺序查找](SequenceSearch.js)， [折半查找](BinarySearch.js)
- [哈希查找](HashSearch.js)
- [索引查找](IndexSearch.js)
- [二叉排序树](BSTree.js)

### 效率比较 Benchmark

设置 `benchmark.js`中数组的大小及范围，然后运行 `node benchmark.js`;
即可看到结果：

数组 length = 10
```
冒泡排序 x 11,637,286 ops/sec ±0.43% (89 runs sampled)
堆排序 x    1,308,187 ops/sec ±0.37% (92 runs sampled)
插入排序 x 31,090,534 ops/sec ±0.77% (90 runs sampled)
归并排序 x    188,771 ops/sec ±1.25% (86 runs sampled)
快速排序 x  4,667,375 ops/sec ±0.27% (90 runs sampled)
选择排序 x 11,502,856 ops/sec ±0.35% (90 runs sampled)
希尔排序 x  7,577,178 ops/sec ±0.42% (93 runs sampled)
Fastest is 插入排序
```

数组 length = 100
```
冒泡排序 x    156,188 ops/sec ±1.02% (89 runs sampled)
堆排序 x      80,778 ops/sec ±0.60% (88 runs sampled)
插入排序 x 5,171,258 ops/sec ±0.40% (90 runs sampled)
归并排序 x    16,033 ops/sec ±1.09% (91 runs sampled)
快速排序 x   143,552 ops/sec ±0.45% (92 runs sampled)
选择排序 x   160,428 ops/sec ±0.41% (92 runs sampled)
希尔排序 x   402,890 ops/sec ±0.40% (91 runs sampled)
Fastest is 插入排序
```

数组 length = 1000
```
冒泡排序 x   1,978 ops/sec ±0.51% (92 runs sampled)
堆排序 x     5,508 ops/sec ±1.27% (91 runs sampled)
插入排序 x 569,615 ops/sec ±1.06% (86 runs sampled)
归并排序 x   1,418 ops/sec ±0.83% (90 runs sampled)
快速排序 x   2,163 ops/sec ±0.39% (92 runs sampled)
选择排序 x   1,985 ops/sec ±0.43% (91 runs sampled)
希尔排序 x  26,384 ops/sec ±0.52% (90 runs sampled)
Fastest is 插入排序
```

数组 length = 10000
```
冒泡排序 x     19.98 ops/sec ±1.26% (37 runs sampled)
堆排序 x      441 ops/sec ±1.35% (85 runs sampled)
插入排序 x 56,331 ops/sec ±0.56% (87 runs sampled)
归并排序 x    133 ops/sec ±0.76% (75 runs sampled)
快速排序 x     22.80 ops/sec ±0.63% (41 runs sampled)
选择排序 x     20.06 ops/sec ±1.01% (37 runs sampled)
希尔排序 x  1,842 ops/sec ±3.70% (40 runs sampled)
Fastest is 插入排序
```

快排居然这么慢？是我写的有问题吗
