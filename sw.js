const CACHE_NAME = 'tat-app-v1';
const ASSETS = [
  '/tat-app/',
  '/tat-app/index.html',
  '/tat-app/manifest.json',
  '/tat-app/icon-192.png',
  '/tat-app/icon-512.png',
  '/tat-app/icon-180.png',
  '/tat-app/icon-32.png'
];

// Instalar y cachear archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activar y limpiar caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Responder desde cache si no hay internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() => caches.match('/tat-app/index.html'));
    })
  );
});
