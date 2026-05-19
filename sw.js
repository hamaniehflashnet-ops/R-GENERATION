// Service Worker - Radio Génération 100% DD
const CACHE_NAME = 'rg-cache-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

// Intercepter les requêtes audio pour les garder actives
self.addEventListener('fetch', e => {
  if (e.request.url.includes('radioking.com')) {
    e.respondWith(fetch(e.request).catch(() => new Response('')));
    return;
  }
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

// Message pour garder la connexion active
self.addEventListener('message', e => {
  if (e.data === 'keepalive') {
    e.ports[0].postMessage('alive');
  }
});
