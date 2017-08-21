
# schdule.js

easy to invoke `requestAnimationFrame`, and provide [requestAnimationFrame polyfill](../requestAnimationFrame.js)

方便调用 `requestAnimationFrame`, 可引入旧浏览器兼容的 [ requestAnimationFramepolyfill](../requestAnimationFrame.js)

## noted

'use strict' 严格模式下， `callback` of `requestAnimationFrame` context is `undefined`

## usage

```js
var scrollPos = schdule(function (a, b){
  console.log('top:', a, 'left:', b);
});

['scroll', 'resize'].forEach(function (event){
  document.addEventListener(event, function (){
    scrollPos(window.scrollY, window.scrollX);
  }, false);
});
```
