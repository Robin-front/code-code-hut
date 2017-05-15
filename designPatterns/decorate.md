## 装饰者模式

装饰者模式是为已有功能动态地添加更多功能的一种方式，把每个要装饰的功能放在单独的函数里，然后用该函数包装所要装饰的已有函数对象，因此，当需要执行特殊行为的时候，调用代码就可以根据需要有选择地、按顺序地使用装饰功能来包装对象。

**优点是把类（函数）的核心职责和装饰功能区分开了。**

```js
function Macbook (){
  this.cost = function (){
    return 7500;
  },
  this.screenSize = function () {
    return 11.6;
  };
}

function memoryDecorate(macbook){
  var v = macbook.cost();
  macbook.cost = function(){
    return v + 750;
  }
}

function insurance(macbook){
  var v = macbook.cost();
  macbook.cost = function (){
    return v+ 300;
  }
}

var myMac = new Macbook();
memoryDecorate(myMac);
insurance(myMac);
myMac.cost(); // 8580;
```

上例只是对部分接口进行了重写。也可以是扩展。
