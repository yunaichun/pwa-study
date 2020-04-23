// == service worker 注册的时候调用: 添加缓存
self.addEventListener('install', event => {
    console.log('install', event);

    // == self.skipWaiting(): Service Worker 一旦更新，需要等所有的终端都关闭之后，再重新打开页面才能激活新的 Service Worker，这个过程太复杂了
    // == event.waitUtil(): 等待 self.skipWaiting() 结束后才进入到 activate 状态
    event.waitUntil(self.skipWaiting());
});

// == service worker 注册之后调用: 删除旧缓存
self.addEventListener('activate', event => {
    console.log('activate', event);
    // == 为了保证 Service Worker 激活之后能够马上作用于所有的终端，通常在激活 Service Worker 后，通过在其中调用 self.clients.claim() 方法控制未受控制的客户端
    event.waitUntil(self.clients.claim());
});

// == 会拦截所有的请求: 取网络或缓存
self.addEventListener('fetch', event => {
    console.log('fetch', event);
});