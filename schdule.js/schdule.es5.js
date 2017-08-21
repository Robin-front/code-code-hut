
// es5
var schdule = function (fn){
  var timer = null,
      args = [];
  return function (){
    if (timer){ return timer; }
    args = Array.prototype.slice.call(arguments);
    timer = requestAnimationFrame(function (){
      timer = null;
      fn.apply(undefined, args); // 原生实现 this 也是 undefined
    });
  }
}
