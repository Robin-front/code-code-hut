// 哈希查找
//设计函数采用：”除法取余法“。
//冲突方面采用:”开放地址线性探测法"。
// 哈希查找时间复杂度O(1), 就是。。一下就找到了。。


function insertHash(arr, hashLength, val){
  var hashAddress = val%hashLength;

  while (arr[hashAddress] != undefined) {
    hashAddress = (++hashAddress)%hashLength;
  }

  arr[hashAddress] = val;
}


function searchHash(arr, hashLength, val){
  var hashAddress = val%hashLength;

  //指定hashAdrress对应值存在但不是关键值，则用开放寻址法解决
  while (arr[hashAddress] != val && arr[hashAddress] != undefined) {
    hashAddress = (++hashAddress)%hashLength;
  }

  //查找到了开放单元，表示查找失败
  if(arr[hashAddress] == undefined){
    return -1;
  }
  return hashAddress;
}

// var a = [123,25,435,2,435,432,743,6584,54,67,54], hash = [];
// a.forEach(function (val){
//
//   insertHash(hash, 27, val);
// });
// console.log(searchHash(hash, 27, 6584));
// console.log(hash);
