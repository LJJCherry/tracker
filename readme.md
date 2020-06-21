### 实现简单的监控 sdk

**错误分类**

- JS 错误
  - JS 错误
  - Promise 异常
- 资源异常
  - 监听 error
- 页面白屏
  - 利用 elementsFromPoint

#### 资源加载、JS 异常错误捕获：

```
 window.addEventListener('error', (event) => {
   if (event.target && (event.target.src || event.target.href)) {
      //捕获资源加载异常
      traker.send({errorType: 'resourceError'});
   } else {
     // 捕获js error
     traker.send({errorType: 'jsError'});
   }
 }, true)
// true代表在事件捕获阶段，由于网络请求异常不会事件冒泡，因此必须在捕获阶段将其捕捉到才行
```

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/105555/1590992622842-17e1f32e-ced5-4764-834c-640435102dbb.png#align=left&display=inline&height=135&margin=%5Bobject%20Object%5D&name=image.png&originHeight=270&originWidth=2628&size=394727&status=done&style=none&width=1314)<br />

目前验证（`<script>` `<img>`的资源加载 404）都可以通过 addEventListener error 捕获到，link css 资源未捕获到，待研究<br />一般 JS 运行时错误使用 window.onerror 捕获处理？？？？

#### Promise 错误捕获

当[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)  被 reject 且没有 reject 处理器的时候，会触发  **`unhandledrejection`**  事件

```javascript
window.addEventListener(
  "unhandledrejection",
  (event) => {
    // errorType: "promiseError"
    console.log("promiseError", event);
  },
  true
);
```

效果如下<br />
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2020/png/105555/1590993639864-98b9fb06-9788-4829-9d0c-c09f97d560bf.png#align=left&display=inline&height=369&margin=%5Bobject%20Object%5D&name=image.png&originHeight=738&originWidth=2814&size=809068&status=done&style=none&width=1407)<br />

### 页面白屏

利用 elementsFromPoint 这个 api, 这个 api 主要是返回某一个坐标点所有的元素

```
document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2);
```
