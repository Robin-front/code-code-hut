function createIdleTask(){
  var task = [],
      timer = null;

  function runTask(deadline){
    var len = task.length;
    while(deadline.timeRemaining() > 0 && len--) {
      task.shift()();
    }
    if (len > 0){
      timer = requestIdleCallback(runTask);
    }
  }

  return {
    addTask: function (handle){
      task.push(handle);
      timer = requestIdleCallback(runTask);
    }
  }
}
