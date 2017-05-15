## 代理模式

代理，顾名思义就是帮助别人做事，GoF对代理模式的定义如下：

**代理模式（Proxy），为其他对象提供一种代理以控制对这个对象的访问。**

```js
$( "button" ).on( "click", function () {
  // 给操作添加延迟
  setTimeout(function () {
    // "this" 无法关联到我们点击的元素
    // 而是关联了window对象
    $( this ).addClass( "active" );
  });
});
```

```js
$( "button" ).on( "click", function () {

    setTimeout( $.proxy( function () {
        // "this" 现在关联了我们想要的元素
        $( this ).addClass( "active" );  
    }, this), 500);

    // 最后的参数'this'代表了我们的dom元素并且传递给了$.proxy()方法
});
```

jQuery 的代理实现方法如下：

```js
// Bind a function to a context, optionally partially applying any
  // arguments.
  proxy: function( fn, context ) {
    if ( typeof context === "string" ) {
      var tmp = fn[ context ];
      context = fn;
      fn = tmp;
    }

    // Quick check to determine if target is callable, in the spec
    // this throws a TypeError, but we will just return undefined.
    if ( !jQuery.isFunction( fn ) ) {
      return undefined;
    }

    // Simulated bind
    var args = slice.call( arguments, 2 ),
      proxy = function() {
        return fn.apply( context, args.concat( slice.call( arguments ) ) );
      };

    // Set the guid of unique handler to the same of original handler, so it can be removed
    proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;

    return proxy;
  }

```
