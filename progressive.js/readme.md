# 渐进式图片加载

一些活动页的图片比较大，尤其是背景图片。该插件的原理就是通过创建 canvas 层来渲染低质量图片并添加模糊效果，等待高质量图片加载完成后，再显示。

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

## usage

```javascript
$(element).progressive();

// or

$(element).progressive({
  zIndex: -1
});
```

## arguments

### canvasWidth

### canvasHeight

### blur

### zIndex

### useElOffset
