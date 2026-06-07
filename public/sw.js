/* ─────────────────────────────────────────────────────────────
   [DG] OFFLINE SERVICE WORKER
   Intercepts navigation requests when the user is offline
   and serves the Flappy [DG] game instead of a browser error.
───────────────────────────────────────────────────────────── */

const CACHE_NAME    = 'dg-offline-v1';
const OFFLINE_PAGE  = '/offline.html';

// Assets to pre-cache so the game works fully offline
const PRECACHE = [
  OFFLINE_PAGE,
  '/favicon.svg',
];

/* ── INSTALL: pre-cache the offline game ── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE);
    }).then(() => self.skipWaiting())
  );
});

/* ── ACTIVATE: clean up old caches ── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── FETCH: serve offline game on navigation failure ── */
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only intercept same-origin navigation requests
  if (
    request.mode !== 'navigate' ||
    !request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Request succeeded — clone and cache the response, then return it
        if (response && response.status === 200 && response.type === 'basic') {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, cloned));
        }
        return response;
      })
      .catch(() => {
        // Network failed — serve the offline game
        return caches.match(OFFLINE_PAGE).then((cached) => {
          if (cached) return cached;
          // Fallback minimal response if cache is somehow empty
          return new Response(
            '<html><body><h1>[DG] — You are offline</h1></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        });
      })
  );
});
