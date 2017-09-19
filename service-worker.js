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
            '/images/line-tile.png',
            '/images/banner4.jpg',
            '/images/email.png',
            '/images/noise.png',
            '/images/rss.png',
        ]);
    })
    );
});

self.addEventListener('fetch', function(event) {
    //console.log(event.request.url);
    event.respondWith(
        fetch(event.request).catch(function(error) {
            return caches.match(event.request);
        })
    );
});

