## 外观模式

外观模式（Facade）为子系统中的一组接口提供了一个一致的界面，此模块定义了一个高层接口，这个接口值得这一子系统更加容易使用。

我们经常用于兼容浏览器，也用于不同分层之间。

那么何时使用外观模式呢？一般来说分三个阶段：

- 首先，在设计初期，应该要有意识地将不同的两个层分离，比如经典的三层结构，在数据访问层和业务逻辑层、业务逻辑层和表示层之间建立外观Facade。

- 其次，在开发阶段，子系统往往因为不断的重构演化而变得越来越复杂，增加外观Facade可以提供一个简单的接口，减少他们之间的依赖。

- 第三，在维护一个遗留的大型系统时，可能这个系统已经很难维护了，这时候使用外观Facade也是非常合适的，为系系统开发一个外观Facade类，为设计粗糙和高度复杂的遗留代码提供比较清晰的接口，让新系统和Facade对象交互，Facade与遗留代码交互所有的复杂工作。

```js
var addEvent = function (el, event, fn){
  if (el.addEventListener){
    el.addEventListener(event, fn, false);
  } else if (el.attachEvent){
    el.attachEvent('on'+event, fn);
  } else{
    el['on'+event] = fn;
  }
}
```

or

```js
var module = (function() {

    var _private = {
        i:5,
        get : function() {
            console.log( "current value:" + this.i);
        },
        set : function( val ) {
            this.i = val;
        },
        run : function() {
            console.log( "running" );
        },
        jump: function(){
            console.log( "jumping" );
        }
    };

    return {

        facade : function( args ) {
            _private.set(args.val);
            _private.get();
            if ( args.run ) {
                _private.run();
            }
        }
    };
}());


// Outputs: "current value: 10" and "running"
module.facade( {run: true, val:10} );
```

## 优劣

门面一般没有多少缺陷，**但是性能是值得注意的问题**。也就是说，需要确定门面在为我们提供实现的同时是否为我们带来了隐性的消耗，如果是这样的话，那么这种消耗是否合理。
