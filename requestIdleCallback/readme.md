
# requestIdleCallback

适合可延迟的，大运算的，可细分的后台任务。

![https://w3c.github.io/requestidlecallback/images/image01.png](https://w3c.github.io/requestidlecallback/images/image01.png)

![https://w3c.github.io/requestidlecallback/images/image00.png](https://w3c.github.io/requestidlecallback/images/image00.png)

执行时机：
- 有 layout 更新时， timeRemaining 为 layout 更新前的空闲时间
- 没有 layout 更新时，timeRemaining 最大为 50ms

大量运算 [演示 demo](https://robin-front.github.io/code-code-hut/requestIdleCallback/demo.html)

# shim(not polyfill)

[requestIdleCallback.shim.js](./requestIdleCallback.shim.js)

无法 polyfill 的原因是，使用 `setTimeout` 无法模拟规范定义的执行时机。

# createIdleTask

a tool function for use requestIdleCallback convinue.

```js
var task = createIdleTask();
task.addTask(function (){ console.log(Date.now()); });
```
