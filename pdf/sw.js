const CACHE_NAME = 'pdf-app-v4';

const ASSETS_TO_CACHE = [
  '../pdfconverter.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 1. التثبيت والتخزين
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // التفعيل الفوري
});

// 2. التفعيل وحذف الكاش القديم
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // السيطرة الفورية على الصفحات
});

// 3. التجربة المهمة: استجابة fetch مؤكدة للمتصفح
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // إرجاع الملف من الكاش إذا وجد، وإلا جليه من الشبكة
      return response || fetch(event.request);
    })
  );
});
