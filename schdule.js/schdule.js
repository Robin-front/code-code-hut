
// es6
export default schdule = (fn) => {
  var timer = null;

  return (...args) => {
    if (timer){
      return timer;
    }

    timer = requestAnimationFrame(() => {
      timer = null;
      fn.apply(undefined, ...args); // 原生实现 this 也是 undefined
    });
    return timer;
  }
}
