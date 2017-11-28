
const log = console.log.bind();

// 顶点
const Vertex = function (x, y, z) {
  this.x = parseFloat(x);
  this.y = parseFloat(y);
  this.z = parseFloat(z);
}

// 立方体
const Cube = function (center, size) {
  const l = size/2;

  // 六顶点
  this.vertices = [
    new Vertex(center.x-l, center.y-l, center.z+l),
    new Vertex(center.x-l, center.y-l, center.z-l),
    new Vertex(center.x+l, center.y-l, center.z-l),
    new Vertex(center.x+l, center.y-l, center.z+l),
    new Vertex(center.x+l, center.y+l, center.z+l),
    new Vertex(center.x+l, center.y+l, center.z-l),
    new Vertex(center.x-l, center.y+l, center.z-l),
    new Vertex(center.x-l, center.y+l, center.z+l)
  ];

  // 顶点组成六面
  this.faces = [
    [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]], 
    [this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]], 
    [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]], 
    [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]], 
    [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]], 
    [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]
  ];
}

function render(objects, ctx, dx, dy) {
  ctx.clearRect(0, 0, 2 * dx, 2 * dy);
  for (const object of objects) {
    for (const face of object.faces) {
      // const P = project(face);
      const P = project_prespective(face[0]);
      ctx.beginPath();
      ctx.moveTo(P.x + dx, P.y + dy);

      for (const point of face) {
        const P = project_prespective(point);
        ctx.lineTo(P.x + dx, P.y + dy);
      }

      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
  }
}

// 映射的 2D 平面坐标
function Vertex2D (x, y) {
  this.x = x;
  this.y = y;
}

// 直接删除一个坐标，形成平面坐标
function project(point){
  return new Vertex2D(point.x, point.z);
}

// 透视效果， 远小近大
function project_prespective(point) {
  const distance = 500;
  // 按垂直视面的坐标轴为标准
  const rate = point.y / distance;

  return new Vertex2D(point.x*rate, point.z*rate);
}

;(function (window, undefined) {
  const canvas = document.querySelector('#canvas');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const dx = canvas.width / 2;
  const dy = canvas.height / 2;
  
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fillStyle = 'rgba(0, 150, 255, 0.3)';

  const cube_center = new Vertex(0, 15 * dy / 10, 0);
  const cube = new Cube(cube_center, dy);
  const object = [cube];

  let autorotate_timer = true;

  draw();

  let mousedown = false;
  let fixedX = 0;
  let fixedY = 0;

  canvas.addEventListener('mousedown', initMove);
  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', stop);


  function initMove(e) {
    autorotate_timer = false;
    mousedown = true;
    fixedX = e.clientX;
    fixedY = e.clientY;
  }

  function move (e) {
    if (mousedown) {
      // 弧度转角度
      const theta = (e.clientX - fixedX) * Math.PI / 180;
      const phi = (e.clientY - fixedY) * Math.PI / 180;

      for (const point of cube.vertices) {
        rotate(point, cube_center, theta, phi);
      }

      fixedX = e.clientX;
      fixedY = e.clientY;

      window.requestAnimationFrame(draw);
    }
  }

  function stop () {
    mousedown = false;
    setTimeout(function () {
      autorotate_timer = true;
      autorotate();
    }, 1000);
  }

  // theta, phi 为角度， 只旋转 两个角度，未实现 y 轴移动
  function rotate (point, center, theta, phi) {
    const ct = Math.cos(theta);
    const st = Math.sin(theta);
    const cp = Math.cos(phi);
    const sp = Math.sin(phi);

    const x = point.x - center.x;
    const y = point.y - center.y;
    const z = point.z - center.z;

    // https://zh.wikipedia.org/wiki/%E4%B8%89%E7%BB%B4%E6%8A%95%E5%BD%B1
    // 三维投影坐标计算
    point.x = ct * x - st * cp * y + st * sp * z + center.x;
    point.y = st * x + ct * cp * y - ct * sp * z + center.y;
    point.z = sp * y + cp * z + center.z;
  }

  function autorotate() {
    for (const point of cube.vertices) {
      rotate(point, cube_center, - 2 * Math.PI / 360, 2 * Math.PI / 360);
    }
    window.requestAnimationFrame(draw);
  }

  function draw() {
    render(object, ctx, dx, dy);
    if (autorotate_timer) {
      autorotate();
    }
  }

})(window||global);