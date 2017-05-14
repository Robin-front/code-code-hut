## 原型模式

Object.create

```js
var Car = {
  publicMothod: function (){
    console.log('publicMothod');
  }
}

var SUV = Object.create(Car);

var VAN = Object.create(Car, {
  id: {
    value: MY_GLOBAL.nextId(),
    writable: false, // by default
    configurable: false, // by default
    enumerable: true
  }
})
```

或者模拟

```js

var inherit = (function (){
  function F (){}
  return function (proto){
    F.prototype = proto;
    return new F();
  }
})();
```
