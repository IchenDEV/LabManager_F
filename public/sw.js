/* eslint-disable no-console */
/**
 * service worker
 */
var cacheName = 'bs-0-3-0';
var apiCacheName = 'api-0-1-1';
var cacheFiles = [
  '/',
  './index.html',
  './base64util.js',
];
self.addEventListener('install', function (e) {
  console.log('Service Worker 状态： install');
  var cacheOpenPromise = caches.open(cacheName).then(function (cache) {
    return cache.addAll(cacheFiles);
  });
  e.waitUntil(cacheOpenPromise);
});
self.addEventListener('activate', function (e) {
  console.log('Service Worker 状态： activate');
  var cachePromise = caches.keys().then(function (keys) {
    return Promise.all(keys.map(function (key) {
      if (key !== cacheName && key !== apiCacheName) {
        return caches.delete(key);
      }
    }));
  })
  e.waitUntil(cachePromise);
  return self.clients.claim();
});
self.addEventListener('fetch', function (e) {
  var cacheRequestUrls = [
    '/book?'
  ];
  console.log('现在正在请求：' + e.request.url);
  var needCache = cacheRequestUrls.some(function (url) {
    return e.request.url.indexOf(url) > -1;
  });
  if (needCache) {
    caches.open(apiCacheName).then(function (cache) {
      return fetch(e.request).then(function (response) {
        cache.put(e.request.url, response.clone());
        return response;
      });
    });
  } else {
    e.respondWith(
      caches.match(e.request).then(function (cache) {
        return cache || fetch(e.request);
      }).catch(function (err) {
        console.log(err);
        return fetch(e.request);
      })
    );
  }
});
self.addEventListener('push', function (e) {
  var data = e.data;
  if (e.data) {
    data = data.json();
    console.log('push的数据为：', data.text());
    self.registration.showNotification(data.text());
  } else {
    console.log('push没有任何数据');
  }
});
