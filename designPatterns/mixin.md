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

## 优点&缺点

**Mixin支持在一个系统中降解功能的重复性,增加功能的重用性** .在一些应用程序也许需要在所有的对象实体共享行为的地方,我们能够通过在一个Mixin中维护这个共享的功能,来很容易的避免任何重复,而因此专注于只实现我们系统中真正彼此不同的功能.

也就是说,对Mixin的副作用是值得商榷的.一些开发者感觉将功能注入到对象的原型中是一个坏点子,因为它会 **同时导致原型污染和一定程度上的对我们原有功能的不确定性** .在大型的系统中,很可能是有这种情况的.

我认为,强大的文档对最大限度的减少对待功能中的混入源的迷惑是有帮助的,而且对于每一种模式而言,如果在实现过程中小心行事,我们应该是没多大问题的.
