(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.progressiveBg = factory();
  }
}(this, function() {
  'use strict';

  function progressiveBg(opts) {
    var $el = document.querySelectorAll(opts.el);

    function support_canvas() {
      var elem = document.createElement('canvas');
      return !!(elem.getContext && elem.getContext('2d'));
    }

    var defaults = {
      type: 'img',
      // el: '.header',
      // canvasWidth: auto,
      // canvasHeight: '540'
      radius: '5',
      zoom: 'height',
      // zIndex: -1,
      useElOffset: true
    };
    for (var i in defaults) {
      if (defaults.hasOwnProperty(i)) {
        opts[i] = (opts[i] !== undefined ? opts[i] : defaults[i]);
      }
    }


    if (!support_canvas()) {
      // 不支持canvas，直接加载原图
      $el.forEach(function(el, i) {
        var src = el.getAttribute('data-src');
        el.style.backgroundImage = 'url(' + src + ')'
      });

      return false;
    }

    $el.forEach(function(el, i) {
      var elH = el.offsetHeight;
      var elW = el.offsetWidth;
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext("2d");
      var imageThumb = new Image();

      canvas.className = 'progressive-canvas';
      canvas.width = opts.canvasWidth || elW;
      canvas.height = opts.canvasHeight || elH;

      if (!opts.useElOffset) {
        opts.canvasWidth && (canvas.style.width = opts.canvasWidth + 'px');
        opts.canvasHeight && (canvas.style.height = opts.canvasHeight + 'px');
      }

      opts.zIndex && (canvas.zIndex = opts.zIndex);
      el.insertBefore(canvas, el.firstChild);


      // 缩略图
      imageThumb.onload = function() {
        var sx = 0;
        var sy = 0;
        var swidth = imageThumb.width;
        var sheight = imageThumb.height;

        var rate = opts.zoom === 'height' ? elH / sheight : elW / swidth; // 以高度为缩放标准
        var width = imageThumb.width * rate;
        var height = imageThumb.height * rate;
        //居中显示
        var x = (elW - width) / 2; // 使用 canvas 的宽度减去图片宽度, 计算居中位置
        var y = (elH - height) / 2; // 使用 canvas 的高度减去图片高度, 计算居中位置
        if (stackBlurImage){
          stackBlurImage(imageThumb, canvas, opts.radius);
        } else {
          ctx.filter = 'blur(' + opts.radius + 'px)';
          ctx.drawImage(imageThumb, sx, sy, swidth, sheight, x, y, width, height);
        }
        imageThumb = null;

        loadOrigin(el, canvas);
      };
      imageThumb.src = el.getAttribute('data-thumb');

    });


    function loadOrigin(el, canvas) {
      // 加载原图
      var imageOrigin = new Image();
      imageOrigin.onload = function() {
        el.style.backgroundImage = 'url(' + imageOrigin.src + ')';
        canvas.className = canvas.className + ' progressive-canvas--hidden';
        // ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
        imageOrigin = canvas = null;
        // console.log('loaded');
      };
      imageOrigin.src = el.getAttribute('data-src');
    }
  }
  return progressiveBg;
}));
