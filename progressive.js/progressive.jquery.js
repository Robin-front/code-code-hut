;(function(window, $, undefined){
  function progressive(opts){

    var $el = this === window ? $(opts.el): $(this);

    function support_canvas(){
      var elem = document.createElement('canvas');
      return !!(elem.getContext && elem.getContext('2d'));
    }

    if (!support_canvas()){
      $el.css('background-image', 'url('+ $el.data('src') +')');
      return false;
    }

    opts = opts || {
      // el: '.header',
      // canvasWidth: auto,
      // canvasHeight: '540'
      // blur: 'blur(10px)',
      // zIndex: -1,
      useElOffset: true
    };

    var elH = $el.outerHeight();
    var elW = $el.width();
    var canvas = document.createElement('canvas');
    var $canvas = $(canvas);
    var ctx = canvas.getContext("2d");
    var imageThumb = new Image();

    canvas.className = 'canvas';
    canvas.width = opts.canvasWidth || elW;
    canvas.height = opts.canvasHeight || elH;
    if (!opts.useElOffset){
      opts.canvasWidth && $canvas.width(opts.canvasWidth);
      opts.canvasHeight && $canvas.height(opts.canvasHeight);
    }

    opts.zIndex && $canvas.css('zIndex', opts.zIndex);
    ctx.filter = opts.blur || 'blur(10px)';
    $el.prepend($canvas);

    // 缩略图
    imageThumb.onload = function(){
      var sx = 0;
      var sy = 0;
      var swidth = imageThumb.width;
      var sheight = imageThumb.height;

      var rate = elH/sheight; // 以高度为缩放标准
      var width = imageThumb.width*rate;
      var height = imageThumb.height*rate;

      //居中显示
      var x = (elW - width) / 2;   // 使用 canvas 的宽度减去图片宽度, 计算居中位置
      var y = (elH - height) / 2; // 使用 canvas 的高度减去图片高度, 计算居中位置
      ctx.drawImage(imageThumb, sx, sy, swidth, sheight, x, y, width, height);
      imageThumb = null;

      loadOrigin();
    };
    imageThumb.src = $el.data('thumb');


    function loadOrigin(){
      // 加载原图
      var imageOrigin = new Image();
      imageOrigin.onload = function(){
        $el.css('background-image', 'url('+ imageOrigin.src +')');
        $canvas.addClass('canvas--hidden');
        // ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
        imageOrigin = $canvas = canvas = null;

        // console.log('loaded');
      };
      imageOrigin.src = $el.data('src');
    }
  }

  $.fn.progressive = progressive;

})(window, jQuery)
