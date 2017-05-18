// 索引查找

// 顾名思义，先找索引，再找主表

var arr = [
  123,124,127,115,154,,,,,,
  223,224,227,225,254,,,,,,
  323,324,354,,,,,,,,
];

var indexArr = [
  { index: 1, start: 0, length: 5 },
  { index: 2, start: 10, length: 5 },
  { index: 3, start: 20, length: 3 }
]

function insertIndex(arr, val){
  // 插入
  var index = Math.floor(val/100);
  var indexItem;

  // 先找索引
  indexArr.forEach(function (item){
    if (item.index == index){
      indexItem = item;
    }
  });

  if (!indexItem){
    return -1;
  }

  // 再插入
  arr[indexItem.start + indexItem.length] = val;
  indexItem.length++;
  return 1;
}

function searchIndex(arr, val){
  // 查找
  var index = Math.floor(val/100);
  var indexItem;

  indexArr.forEach(function(item){
    if (item.index ==  index){
      indexItem = item;
    }
  });

  if (!indexItem){
    return -1;
  }

  for (var i = indexItem.start; i < indexItem.start + indexItem.length; i++){
    if (arr[i] == val){
      return i;
    }
  }

  return -1;
}


console.log(insertIndex(arr, 398));
console.log('arr', arr);
console.log(searchIndex(arr, 398));
