;(function () {

  var vendors = ['webkit', 'moz']; // prefix o and ms does not be supported

  for (var i = 0, len = vendors.length; i < len && !window.requestAnimationFrame; i++) {
    var vp = vendors[i];
    window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame']; // cancelAnimationFrame has two version
  }

  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) { // ios 6 has bug, upper ios 6 was supported.
    var lastTime = 0, gap = 1000/60;
    window.requestAnimationFrame = function (fn){
      var now = new Date.getTime(),
          nextTime = Math.max(lastTime + gap, now);
      return setTimeout(function (){ fn(lastTime = nextTime); }, nextTime - now); // 可能发生阻塞, setTimeout 时间动态设置, 原生实现的回调返回一个 高精度时间 performance.now()
    }
    window.cancelAnimationFrame = clearTimeout;
  }
})()
