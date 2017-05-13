## 构造器模式

简单版本的构造器模式

```js
function Car(model, years, miles){
  this.model = model;
  this.years = years;
  this.miles = miles;

  this.toString = function (){
    return this.model + ' had done' + this.miles + ' miles';
  }
}
```

一个是难以继承，另一个是每个Car构造函数创建的对象中，toString()之类的函数都被重新定义。这不是非常好，理想的情况是所有Car类型的对象都应该引用同一个函数.

```js
function Car(model, years, miles){
  this.model = model;
  this.years = years;
  this.miles = miles;
}

Car.prototype.toString = function (){
  return this.model + ' had done' + this.miles + ' miles';
}

//Use

var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );

console.log( civic.toString() );
console.log( mondeo.toString() );
```

通过上面代码，单个toString()实例被所有的Car对象所共享了。
