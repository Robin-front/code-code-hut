## 织入模式（mixin）

织入目标类

其实就是扩展超类的原型，mixin 可以是多个超类共有的方法。

```js
var mixins = {
  moveUp: function (){
    console.log('moveUp');
  },
  moveDown: function (){
    console.log('moveDown');
  },
  stop: function (){
    console.log('stop');
  }
};

function CarAnimate(){
  this.moveLeft = function (){
    console.log('moveLeft');
  }
}

function PersonAnimate(){
  this.moveRandomly = function (){
    console.log('moveRandomly');
  }
}

// extend
_.extend(CarAnimate, mixins);
_.extend(PersonAnimate, mixins);

var myCar = new CarAnimate();
myCar.moveLeft();
myCar.moveDown();
myCar.stop();
```
