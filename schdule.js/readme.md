
# schdule.js

`requestAnimationFrame` still running on the main thread before triggering the browser to redraw, it is also possible to reduce efficiency because of congestion. To avoid inadvertent high frequency calls `requestAnimationFrame`, so wrap to `schdule`, easy to invoke `requestAnimationFrame`, and provide [requestAnimationFrame polyfill](../requestAnimationFrame.js)


`requestAnimationFrame` 仍然运行于主线程，触发于浏览器重绘前，同样有可能因为阻塞而降低效率。为了避免无意中高频调用 `requestAnimationFrame`，封装成 `schdule`， 方便调用 `requestAnimationFrame`, 可引入旧浏览器兼容的 [ requestAnimationFramepolyfill](../requestAnimationFrame.js)

## noted

'use strict' 严格模式下， `callback` of `requestAnimationFrame` context is `undefined`

## usage

```js
var scrollPos = schdule(function (a, b){
  console.log('top:', a, 'left:', b);
});

document.addEventListener('mousemove', function (){
  scrollPos(window.scrollY, window.scrollX);
}, false);
```
