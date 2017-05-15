(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.progressive = factory();
  }
}(this, function() {
  'use strict';

  function progressive(opts) {
    var $el = document.querySelectorAll(opts.el);

    function support_canvas() {
      var elem = document.createElement('canvas');
      return !!(elem.getContext && elem.getContext('2d'));
    }

    var defaults = {
      // el: '.header',
      radius: '10',
      lazyClass: 'J-lazy',
      imageClass: 'progressive-origin',
      canvasClass: 'progressive-canvas',
      // zIndex: -1,
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
        var imageOrigin = new Image();
        imageOrigin.src = src;
        el.appendChild(imageOrigin);
      });

      return false;
    }

    $el.forEach(function(el, i) {
      var elH = el.offsetHeight;
      var elW = el.offsetWidth;
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext("2d");
      var imageThumb = new Image();

      // 缩略图
      imageThumb.onload = function() {
        var sx = 0;
        var sy = 0;
        var x = 0;
        var y = 0;
        var swidth = imageThumb.width;
        var sheight = imageThumb.height;

        var rate = sheight / swidth;
        var width = 75;
        var height = width * rate;
        canvas.className = opts.canvasClass;
        canvas.width = width;
        canvas.height = height;

        opts.zIndex && (canvas.zIndex = opts.zIndex);
        if (stackBlurImage) {
          stackBlurImage(imageThumb, canvas, opts.radius);
        } else {
          ctx.filter = 'blur(' + opts.radius + 'px)';
          ctx.drawImage(imageThumb, sx, sy, swidth, sheight, x, y, width, height);
        }
        el.appendChild(canvas);

        var zoom = swidth / elW;
        el.style.height = sheight / zoom + 'px';
        imageThumb = null;

        // loadOrigin(el, canvas);
      };
      imageThumb.src = el.getAttribute('data-thumb');

    });


    function loadOrigin(el, canvas) {
      if ( el.className.replace(/[\n\t]/g, " ").indexOf(" is-loaded ") > -1 ){
        return false;
      }
      // 加载原图
      var imageOrigin = new Image();
      imageOrigin.className = opts.imageClass + ' progressive-canvas--hidden'
      imageOrigin.onload = function() {
        el.className = el.className.replace(opts.lazyClass, '');
        el.insertBefore(imageOrigin, el.firstChild);
        canvas.className = canvas.className + ' progressive-canvas--hidden';
        imageOrigin.className = opts.imageClass;
        // ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
        imageOrigin = canvas = null;
        // console.log('loaded');
      };
      imageOrigin.src = el.getAttribute('data-src');
    }

    function throttle(fn, delay, mustRunDelay) {
      var timer = null;
      var t_start;
      return function() {
        var context = this,
          args = arguments,
          t_curr = +new Date();
        clearTimeout(timer);
        if (!t_start) {
          t_start = t_curr;
        }
        if (t_curr - t_start >= mustRunDelay) {
          fn.apply(context, args);
          t_start = t_curr;
        } else {
          timer = setTimeout(function() {
            fn.apply(context, args);
          }, delay);
        }
      };
    };

    var lazy = throttle(function(){
        var lazys = document.querySelectorAll('.' + opts.lazyClass)
        var l = lazys.length
        if(l>0){
          for (let i = 0; i < l; i++) {
            var rect = lazys[i].getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0) {
              loadOrigin(lazys[i], lazys[i].querySelector('.' + opts.canvasClass));
            }
          }
        }else {
          ['wheel', 'scroll', 'resize', 'mousewheel'].forEach(function(evt) {
            window.removeEventListener(evt, lazy, false);
          });
        }
      }, 200, 1000);

    ['wheel', 'scroll', 'resize', 'mousewheel'].forEach(function(evt) {
      window.addEventListener(evt, lazy, false);
    });

    // trigger event
    // var event;
    // if (document.createEvent) {
    //     event = document.createEvent("HTMLEvents");
    //     event.initEvent("scroll", true, true);
    //   } else {
    //     event = document.createEventObject();
    //     event.eventType = "scroll";
    //   }
    // window.dispatchEvent(event);

  }
  return progressive;
}));
