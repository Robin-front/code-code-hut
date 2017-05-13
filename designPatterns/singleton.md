#### 限制一个类只能有一个实例化对象

> 当你需要使用它的时候，表明可能需要去重新评估自己的设计。这通常表明系统中的模块要么紧耦合要么逻辑过于分散在代码库的多个部分。单例模式更难测试，因为可能有多种多样的问题出现，例如隐藏的依赖关系，很难去创建多个实例，很难清理依赖关系，等等

```js
var singleton = (function (){
  var instance;

  function init (){
    // 单例

    // 私有方法和变量
    function privateMathod (){
      console.log('I am privateMathod.');
    }

    var privateVariable = 'I am privateVariable.';
    var privateRandomNumber = Math.random();

    return {
      // 公共方法和变量
      publicMathod: function (){
        console.log('I am publicMathod.');
      },
      publicVariable: 'I am also public.',
      getRandomNumber: function (){
        return privateRandomNumber;
      }
    };
  };

  return {
    //  它具有延迟执行的功能
    getInstance: function (){
      if (!instance){
        instance  = init();
      }

      return instanct;
    }
  }
})();

// test
var singleA = singleton.getInstance();
var singleB = singleton.getInstance();

console.log(singleB.getRandomNumber() === singleA.getRandomNumber()); //  true
```
