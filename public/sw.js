self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('workout-app-v1').then((cache) => {
      return cache.addAll(['/index.html', '/manifest.webmanifest', '/icon.svg']);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          const clonedResponse = response.clone();
          caches.open('workout-app-v1').then((cache) => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        })
        .catch(() => caches.match('/index.html'));
    })
  );
});
