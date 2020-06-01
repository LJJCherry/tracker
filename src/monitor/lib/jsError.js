export function injectJsError() {
    window.addEventListener('error', (event) => {
        if (event.target && (event.target.src || event.target.href)) {
            // errorType: "resourceError" 资源加载异常
            console.log('resourceError 资源加载异常', event)
        } else {
            console.log('jsError', event)
            // errorType: "jsError" jsError
        }
    }, true) // true代表在事件捕获阶段，由于网络请求异常不会事件冒泡，因此必须在捕获阶段将其捕捉到才行
    //当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件
    window.addEventListener('unhandledrejection', (event) => {
        // errorType: "promiseError"
        console.log('promiseError', event)
    }, true)
}