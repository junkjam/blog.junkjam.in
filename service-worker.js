importScripts('/cache-polyfill.js');

var version = 'v1.1';
var cacheNameSpace = 'JunkJamBlog';
var cacheName = cacheNameSpace + '-' + version;

self.addEventListener('install', function(e) {
    e.waitUntil(
    caches.open(cacheName).then(function(cache) {
        return cache.addAll([
            '/',
            '/categories/market/',
            '/categories/fashion/',
            '/categories/lifestyle/',
            '/stylesheets/screen.css?v=4.0',
            '/javascripts/octopress.js?v=4.2',
        ]);
    })
    );
});


self.addEventListener('fetch', function(event) {
    //console.log(event.request.url);
    event.respondWith(
    caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
    })
    );
});

