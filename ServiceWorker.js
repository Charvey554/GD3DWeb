const cacheName = "Charvey544-GD3D-0.1.7b";
const contentToCache = [
    "Build/ea153e321edf23b9a40b38d65ce41d01.loader.js",
    "Build/65767f866c90c54e0ae5bfefa6de01a5.framework.js",
    "Build/755e83aa5f056c67858ab725c75fc830.data",
    "Build/ccc1463dd8e0e9b0681d41adf51d97d3.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
