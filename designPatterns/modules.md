## 模块化模式

完整的使用对象字面值定义一个模块的例子

```js
var myModule = {

  myProperty: "someValue",

  // 对象字面值包含了属性和方法（properties and methods）.
  // 例如，我们可以定义一个模块配置进对象：
  myConfig: {
    useCaching: true,
    language: "en"
  },

  // 非常基本的方法
  myMethod: function () {
    console.log( "Where in the world is Paul Irish today?" );
  },

  // 输出基于当前配置（configuration）的一个值
  myMethod2: function () {
    console.log( "Caching is:" + ( this.myConfig.useCaching ) ? "enabled" : "disabled" );
  },

  // 重写当前的配置（configuration）
  myMethod3: function( newConfig ) {

    if ( typeof newConfig === "object" ) {
      this.myConfig = newConfig;
      console.log( this.myConfig.language );
    }
  }
};

// 输出: Where in the world is Paul Irish today?
myModule.myMethod();

// 输出: enabled
myModule.myMethod2();

// 输出: fr
myModule.myMethod3({
  language: "fr",
  useCaching: false
});
```

下面是通过闭包包含私有变量的例子：

```js
var myNamespace = (function () {

  var myPrivateVar, myPrivateMethod;

  // A private counter variable
  myPrivateVar = 0;

  // A private function which logs any arguments
  myPrivateMethod = function( foo ) {
      console.log( foo );
  };

  return {

    // A public variable
    myPublicVar: "foo",

    // A public function utilizing privates
    myPublicFunction: function( bar ) {

      // Increment our private counter
      myPrivateVar++;

      // Call our private method using bar
      myPrivateMethod( bar );

    }
  };

})();
```

大部分类库JQuery, YUI, Dojo, JQuery插件的开发模式使用的就是模块模式。

```js
// Global module
var myModule = (function ( jQ, _ ) {

    function privateMethod1(){
        jQ(".container").html("test");
    }

    function privateMethod2(){
      console.log( _.min([10, 5, 100, 2, 1000]) );
    }

    return{
        publicMethod: function(){
            privateMethod1();                
        }            
    };

// Pull in jQuery and Underscore
}( jQuery, _ ));

myModule.publicMethod();  
```
