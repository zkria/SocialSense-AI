const CACHE_NAME = 'socialsense-cache-v1';
const urlsToCache = [
    '/',
    '/assets/css/main.css',
    '/assets/js/main.js',
    '/assets/images/logo.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
}); 