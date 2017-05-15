## 工厂模式（factory）

以下几种情景下工厂模式特别有用：

- 1.对象的构建十分复杂
- 1.需要依赖具体环境创建不同实例
- 1.处理大量具有相同属性的小对象

```js
var Car = (function (){
  var Car = function (model, years, miles){
    this.model = model;
    this.years = years;
    this.miles = miles;
  }

  return function (model, years, miles){
    return new Car(model, years, miles);
  }

})();

//Use
var ford = Car('ford', 1983, 0);
var lecux = Car('lecux', 1999, 1000);
```

每次调用 Car 函数都分创建一个新对象，就像工厂一样。
另一个例子：


```js
var page = page||{};
page.dom = page.dom||{};

page.dom.text = function (){
  this.insert = function (where){
    var txt = document.createTextNode(this.url);
    where.appendChild(txt);
  }
};

page.dom.link = function (){
  this.insert = function(where){
    var link = document.createElement('a');
    link.href = this.url;
    link.appendChild(document.createTextNode(this.url));
    where.appendChild(link);
  }
};

page.dom.img = function (){
  this.insert = function (where){
    var img = document.createElement('img');
    img.src = this.url;
    where.appendChild(img);
  }
};

// 工厂处理函数
page.dom.factory = function (type){
  return new page.dom[type]();
}

var o = page.dom.factory('link');
o.link = 'http://www.google.com';
o.insert();
```

看起来是不是又有点像命令模式。
