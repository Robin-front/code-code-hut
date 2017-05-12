// 向量对象
var vector = function(x, y){
  this.x = x;
  this.y = y;
}

vector.prototype = {
  length: function(){
    //求斜线的长度, 勾股定量
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  normalize: function(){
    //转单位向量 = 向量/向量长度， 即x,y分别除以向量长度
    var inv = 1/this.length();
    return new vector(this.x*inv, this.y*inv);
  },
  add: function(v){
    // 向量相加，即x,y分别相加
    return new vector(this.x + v.x, this.y + v.y);
  },
  multiply: function(f){
    //向量延长
    return new vector(this.x * f, this.y * f);
  },
  dot: function(v){
    // 向量的数量积，即 x,y 分别相乘
    return this.x*v.x + this.y*v.y;
  },
  angle: function(v){
    // 角度等于弧度乘于180再除于PI
    // degrees = radians * 180/Math.PI
    //
    // 弧度等于角度度乘于PI再除于180
    // radians = degrees * Math.PI/180
    //
    // 再有 ab = |a||b|conß
    // 计算两个向量的角度，conß = ab/|a||b|, ß = acos(ab/|a||b|) * 180 / Math.PI
    var cos$ = this.dot(v)/(this.length()*v.length());
    return Math.acos(cos$) * 180 / Math.PI;
  }

}

function getControlPoint(path){
  var i = 0, count = path.length - 2;
  var arr = [];
  var rt = 0.2;
  for (; i < count; i++){
    var start = path[i], mid = path[i+1], end = path[i+2]; // 必须三点及以上才能绘制贝赛尔曲线，两点为直线
    var v1 = new vector(start.x - mid.x, start.y - mid.y); // 向量v1
    var v2 = new vector(end.x - mid.x, end.y - mid.y); // 向量 v2
    var v1Len = v1.length(), v2Len = v2.length(); // 两段向量的长度

    var v1per = v1.normalize(), v2per = v2.normalize(); // 向量 v1, v2的单位向量
    var centerper = v1per.add(v2per).normalize(); // 角平分线的单位向量
    var ctrlper1 = new vector(centerper.y, centerper.x * -1), ctrlper2 = new vector(centerper.y * -1, centerper.x);  // 两控制点的单位向量

    if (ctrlper1.angle(v1) < 90){
      var ctrl1 = ctrlper1.multiply(v1Len * rt).add(mid), ctrl2 = ctrlper2.multiply(v2Len * rt).add(mid); // 两控制点实际向量，取两点之前一半
      arr.push(ctrl1, ctrl2);
    } else {
      var ctrl1 = ctrlper1.multiply(v2Len * rt).add(mid), ctrl2 = ctrlper2.multiply(v1Len * rt).add(mid); // 两控制点实际向量，取两点之前一半
      arr.push(ctrl2, ctrl1);
    }
  }
  return arr;
}
