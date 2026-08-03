const CACHE_NAME = 'webcraft-v1';
const urlsToCache = [
  '../webcraft.html',
  '../tmgtools/tmgtools.jpg',
  '../tmgtools/icon-96.png',
  '../tmgtools/icon-192.png',
  '../tmgtools/icon-512.png',
  '../tmgtools/apple-touch-icon.png'
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