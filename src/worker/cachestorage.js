// == service worker 注册的时候调用: 添加缓存
self.addEventListener('install', event => {
    console.log('install', event);

    // == self.skipWaiting() : 会让 service worker 跳过等待，直接进入到 activate 状态
    // == event.waitUtil() : 等待 self.skipWaiting() 结束后才进入到 activate 状态
    event.waitUntil(self.skipWaiting());
});

// == service worker 注册之后调用: 删除旧缓存
self.addEventListener('activate', event => {
    console.log('activate', event);
    // == 表示 service worker 激活后，立即获得执行权
    event.waitUntil(self.clients.claim());
});

// == 会拦截所有的请求: 取网络或缓存
self.addEventListener('fetch', event => {
    console.log('fetch', event);
});

async function networkFirst(req) {

}