## 迭代器模式(Iterator)

迭代器模式(Iterator)：提供一种方法顺序遍历一个聚合对象中各个元素，而又不暴露该对象内部表示。

迭代器的几个特点是：

- 访问一个聚合对象的内容而无需暴露它的内部表示。
- 为遍历不同的集合结构提供一个统一的接口，从而支持同样的算法在不同的集合结构上进行操作。
- 遍历的同时更改迭代器所在的集合结构可能会导致问题（比如C#的foreach里不允许修改item）。

```js
var agg = (function (){
  var index = 0,
      data = [0, 1, 2, 3, 4],
      length = data.length;

  return {
    hasNext: function (){
      return index > length;
    },

    next: function (){
      var el;
      if (!agg.hasNext()){
        return null;
      }
      el = data[index];
      index += 2;
      return el;
    },

    rewind: function (){
      index = 0;
    },
    current: function (){
      return data[index];
    }
  }
})();

// 迭代的结果是：1,3,5
while (agg.hasNext()) {
  console.log(agg.next());
}
```

jQuery里一个非常有名的迭代器就是$.each方法，通过each我们可以传入额外的function，然后来对所有的item项进行迭代操作，例如：

```js
$.each(['dudu', 'dudu', '酸奶小妹', '那个MM'], function (index, value) {
    console.log(index + ': ' + value);
});
//或者
$('li').each(function (index) {
    console.log(index + ': ' + $(this).text());
});
```
