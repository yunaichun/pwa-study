let total = 0;
for (let i = 0, len = 1000000; i < len; i++) {
    total += i;
}
self.postMessage({ total });
