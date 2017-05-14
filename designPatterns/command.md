## 命令模式

命名模式的目标是将方法的调用,请求或者操作封装到一个单独的对象中,它们始终都包含一个执行操作(比如run()或者execute())

```js
(function (){
  var CarManager = {
    requestInfo: function (model, id){
      return "The information for " + model + " with ID " + id + " is foobar";
    },

    buyVeicle: function (model, id){
      console.log('buyVeicle');
    },

    arrangeViewing: function (model, id){
      console.log('arrangeViewing');
    }
  };

  CarManager.execute = function (name){
    return CarManager[name] && CarManager[name].apply(CarManager, [].slice.call(arguments, 1));
  }

  // 如下调用
  CarManager.execute( "arrangeViewing", "Ferrari", "14523" );
  CarManager.execute( "requestInfo", "Ford Mondeo", "54323" );
  CarManager.execute( "requestInfo", "Ford Escort", "34232" );
  CarManager.execute( "buyVehicle", "Ford Escort", "34232" );
})();
```
