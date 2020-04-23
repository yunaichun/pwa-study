const CACHE_NAME = 'cache_v1';

// == service worker 注册的时候调用: 添加缓存
self.addEventListener('install', async event => {
    console.log('install', event);

    // == 开启一个 cache, 得到一个 cache 对象
    const cache = await caches.open(CACHE_NAME);
    // == cache 对象可以存储资源
    await cache.addAll([
        '/',
        '/image/start.png',
        '/manifest.json',
        '/index.js',
        '/index.css',
        // '/api'
    ]);

    // == self.skipWaiting() : 会让 service worker 跳过等待，直接进入到 activate 状态
    await self.skipWaiting();
});

// == service worker 注册之后调用: 删除旧缓存
self.addEventListener('activate', async event => {
    console.log('activate', event);

    // == 获取所有缓存资源的 key
    const keys = await caches.keys();
    keys.forEach(key => { if (key !== CACHE_NAME) caches.key(); })

    // == 表示 service worker 激活后，立即获得执行权
    await self.clients.claim();
});

// == 会拦截所有的请求: 取网络或缓存
self.addEventListener('fetch', event => {
    console.log('fetch', event);

    const req = event.request;
    // == 只缓存同源的内容
    const url = new URL(req.url);
    if (url.origin !== self.origin) {
        return;
    }
    // == 接口请求优先走网络，静态资源优先走缓存
    if (req.url.includes('/api')) {
        event.respondWith(networkFirst(req));
    } else {
        event.respondWith(cacheFirst(req));
    }
});

async function networkFirst(req) {
    const cache = await caches.open(CACHE_NAME);
    try {
        const fresh = await fetch(req);
        // == 此处一定要添加 clone
        cache.put(req, fresh.clone());
        return fresh;
    } catch(e) {
        const cached = await cache.match(req);
        return cached;
    }
}

async function cacheFirst(req) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);
    if (cached) {
        return cached
    } else {
        const fresh = await fetch(req);
        cache.put(req, fresh.clone());
        return fresh;
    }
}