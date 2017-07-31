
// es6
export default schdule = (fn) => {
  var timer = null;

  return (...args) => {
    if (timer){
      return timer;
    }

    timer = requestAnimationFrame(() => {
      timer = null;
      fn(...args);
    });
    return timer;
  }
}

// es5
var schdule = function (fn){
  var timer = null,
      args = [];
  return function (){
    if (timer){ return timer; }
    args = Array.prototype.slice.call(arguments);
    timer = requestAnimationFrame(function (){
      timer = null;
      fn.apply(null, args);
    });
  }
}

// useage
var scrollpos = schdule(function (a, b){
  console.log('top:', a, 'left:', b);
});
document.addEventListener('scroll', function (){
  scrollpos(window.scrollY, window.scrollX);
}, false);
