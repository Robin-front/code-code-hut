function draw(ctx, path){
  var canvas = ctx.canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 每次先清理画布
  var ctrlArr = getControlPoint(path); // 获取所有控制点

  // 先画出折线路径
  ctx.beginPath();
  ctx.moveTo(path[0].x, path[0].y); // 起点
  var i = 1, len = path.length;
  ctx.strokeStyle = 'black'; //设置实线样式
  ctx.setLineDash([1,3]);
  for(; i < len; i++){
    ctx.lineTo(path[i].x, path[i].y);
  }
  ctx.stroke();

  // 先画第一段曲线，第一个控制点即是起点。
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.moveTo(path[0].x, path[0].y);
  ctx.bezierCurveTo(path[0].x, path[0].y, ctrlArr[0].x, ctrlArr[0].y, path[1].x, path[1].y);
  ctx.strokeStyle = '#22CAB3';
  ctx.stroke();

  // 画中间曲线
  var j = 1, count = len - 2;
  for(;j < count; j++){
    ctx.beginPath();
    ctx.moveTo(path[j].x, path[j].y);
    ctx.bezierCurveTo(ctrlArr[j*2-1].x, ctrlArr[j*2-1].y, ctrlArr[j*2].x, ctrlArr[j*2].y, path[j + 1].x, path[j + 1].y);
    ctx.strokeStyle = '#22CAB3';
    ctx.stroke();
  }

  // 画最后一段曲线
  var ctrlLen = ctrlArr.length;
  ctx.beginPath();
  ctx.moveTo(path[len - 2].x, path[len - 2].y);
  ctx.bezierCurveTo(ctrlArr[ctrlLen-1].x, ctrlArr[ctrlLen-1].y, path[len-1].x, path[len-1].y, path[len-1].x, path[len-1].y);
  ctx.strokeStyle = '#22CAB3';
  ctx.stroke();


  // 接着画控制线
  for (i = 0; i < ctrlLen; i+=2){
    ctx.beginPath();
    ctx.setLineDash([1, 5]);
    ctx.moveTo(ctrlArr[i].x, ctrlArr[i].y);
    ctx.lineTo(ctrlArr[i+1].x, ctrlArr[i+1].y);
    ctx.strokeStyle = '#FF7784';
    ctx.stroke();
  }

  // 画控制点
  for (i=0; i< ctrlLen; i++){
    ctx.beginPath();
    ctx.fillStyle = "#FF7784";
    ctx.arc(ctrlArr[i].x, ctrlArr[i].y, 3, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  // 顶点
  for (i=0; i< len; i++){
    ctx.beginPath();
    ctx.fillStyle = "#C0E9ED";
    ctx.arc(path[i].x, path[i].y, 3, 0, 2 * Math.PI, true);
    ctx.fill();
  }
}
