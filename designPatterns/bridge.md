## 桥接模式

桥接模式关键是 **抽象部分与实现部分的分离，使得二者可以独立的变化**，而不必拘泥于形式。JS插件灵活的变化，适用场景的多变就非常适合使用这种模式来实现。使用桥接模式最重要的是要找出系统中不同的变化维度


```js
function MessageDialog(animation) {
    this.animation = animation;
}
MessageDialog.prototype.show = function () {
    this.animation.show();
}
function ErrorDialog(animation) {
    this.animation = animation;
}
ErrorDialog.prototype.show = function () {
    this.animation.show();
}
```

这两个类就是前面提到的抽象部分，也就是扩充抽象类，它们都包含一个成员animation。
两种弹窗通过show方法进行显示，但是显示的动画效果不同。我们定义两种显示的效果类如下：

```js
function LinerAnimation() {
}
LinerAnimation.prototype.show = function () {
    console.log("it is liner");
}
function EaseAnimation() {
}
EaseAnimation.prototype.show = function () {
    console.log("it is ease");
}
```

这两个类就是具体实现类，它们实现具体的显示效果。那我们如何调用呢？

```js
var message = new MessageDialog(new LinerAnimation());
message.show();
var error = new ErrorDialog(new EaseAnimation());
error.show();

```

如果我们要增加一种动画效果，可以再定义一种效果类，传入即可。
