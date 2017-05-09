# 渐进式图片加载

一些活动页的图片比较大，尤其是背景图片。该插件的原理就是通过创建 canvas 层来渲染低质量图片并添加模糊效果，等待高质量图片加载完成后，再显示。
需要两张图片，缩略图可以是等比缩放的低质量的压缩图片。现在很多图片服务器上传原图生后都支持在原图链接上添加参数来快速获取缩略图。

## progressive.js

> 适用于非背景图

### options

```js
var default = {
  el: selector,
  radius: '10', // 模糊参数
  imageClass: 'progressive-origin',
  canvasClass: 'progressive-canvas',
  zIndex: -1,
}
```
### usage

```javascript
// js
progressive({
  el: '.selector'
});
```

## progressive.background.js

> 适用于背景图

### options

```javascript
let default = {
  el: selector,
  canvasWidth: null,
  canvasHeight: null
  radius: 10,
  zIndex: null,
  useElOffset: true
}
```

### demo

在 demo 文件夹，只要起个 http 服务就可以看到效果, chrome 也可以设定网络状况，一般设置为 good 2g就可以测试真实情况。

### usage

```javascript
// js
progressiveBg({
  el: '.selector'
});

// html
<header data-thumb="xx/xx.thumb.jpg" data-src="xx/xx.origin.jpg"></header>
```

### arguments

#### canvasWidth

指定 `canvas` 的宽。

> 注意，这里包含两个宽度意义，一个是创建时指定的宽度（必须），默认为 `el` 的宽度，如果设置了该值，则为所指定的值；
另一个为 `computedStyle`, 即最后计算的宽度，默认为 `width: 100%`。
`useElOffset`值只影响 `computedStyle`

#### canvasHeight

指定 `canvas` 的高.

> 注意，这里包含两个高度意义，一个是创建时指定的高度（必须），默认为 `el` 的高度，如果设置了该值，则为所指定的值；
另一个为 `computedStyle`, 即最后计算的高度，默认为 `width: 100%`；
`useElOffset`值只影响 `computedStyle`

#### useElOffset

决定 `canvasWidth` 和 `canvasHeight` 两个配置参数是否影响 `computedStyle`，值为 `false` 时生效。

#### radius

`canvas` 渲染低质量图片时的模糊参数，默认为 `10`

#### zIndex

`canvas` 的 `zIndex` 值，当为背景图片做渐进式加载时，canvas 必须位于内容的底部，默认不指定，但 `position: relative;`
