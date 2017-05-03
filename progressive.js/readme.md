# 渐进式图片加载

一些活动页的图片比较大，尤其是背景图片。该插件的原理就是通过创建 canvas 层来渲染低质量图片并添加模糊效果，等待高质量图片加载完成后，再显示。
需要两张图片，缩略图可以是等比缩放的低质量的压缩图片。现在很多图片服务器上传原图生后都支持在原图链接上添加参数来快速获取缩略图。

## options

```javascript
let default = {
  el: $(this),
  canvasWidth: null,
  canvasHeight: null
  blur: 'blur(10px)',
  zIndex: null,
  useElOffset: true
}
```

## demo

在 demo 文件夹，只要起个 http 服务就可以看到效果, chrome 也可以设定网络状况，一般设置为 good 2g就可以测试真实情况。

## usage

```javascript
// js
$(element).progressive();

// or

$(element).progressive({
  zIndex: -1
});

// html
<header data-thumb="xx/xx.thumb.jpg" data-src="xx/xx.origin.jpg"></header>
```

## arguments

### canvasWidth

指定 `canvas` 的宽，默认为 `width: 100%`

### canvasHeight

指定 `canvas` 的宽，默认为 `height: 100%`

### useElOffset

决定 `canvasWidth` 和 `canvasHeight` 两个配置参数是否生效，值为 `false` 时生效。

### blur

`canvas` 渲染低质量图片时的模糊参数，默认为 `blur(10px)`

### zIndex

`canvas` 的 `zIndex` 值，当为背景图片做渐进式加载时，canvas 必须位于内容的底部，默认不指定，但 `position: relative;`
