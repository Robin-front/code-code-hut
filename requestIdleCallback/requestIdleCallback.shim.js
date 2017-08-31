window.requestIdleCallback = window.requestIdleCallback || function(cb, option) {
  if (typeof option.timeout === 'number'){
    var expire = Date.now();
  }
  return setTimeout(function() {
    var start = Date.now();
    cb({
      didTimeout: expire ? (start - expire) > optiom.timeout : false,
      timeRemaining: function() {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
}

window.cancelIdleCallback = window.cancelIdleCallback || function(id) {
  clearTimeout(id);
}
