/* ─────────────────────────────────────────────────────────────
   [DG] OFFLINE SERVICE WORKER — v2
   Uses a live connectivity probe instead of relying on fetch()
   to fail, so it works even when pages are HTTP-cached by CDN.
───────────────────────────────────────────────────────────── */

const CACHE_NAME   = 'dg-offline-v2';
const OFFLINE_PAGE = '/offline.html';
const PROBE_URL    = '/?_sw-probe=' + Date.now(); // cache-busted probe

const PRECACHE = [
  OFFLINE_PAGE,
  '/favicon.svg',
];

/* ── INSTALL: pre-cache the offline game ── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

/* ── ACTIVATE: wipe old caches, claim clients immediately ── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

/* ── CONNECTIVITY PROBE ──────────────────────────────────────
   Sends a HEAD request with cache: 'no-store' to bypass every
   layer of HTTP caching (Vercel CDN, browser cache, SW cache).
   Returns true if the network is reachable.
─────────────────────────────────────────────────────────────*/
async function isOnline() {
  try {
    const res = await fetch('/?_sw-probe', {
      method: 'HEAD',
      cache: 'no-store',          // bypass HTTP cache
      headers: { 'SW-Probe': '1' } // easy to filter in server logs
    });
    return res.ok;
  } catch {
    return false;
  }
}

/* ── FETCH: intercept all same-origin navigations ── */
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only care about page navigations, not assets/API calls
  if (
    request.mode !== 'navigate' ||
    !request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  event.respondWith(
    isOnline().then((online) => {
      if (online) {
        // We're online — do the real fetch and cache the response
        return fetch(request).then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            caches.open(CACHE_NAME).then((c) => c.put(request, response.clone()));
          }
          return response;
        }).catch(() => serveOffline());
      } else {
        // Confirmed offline — serve the game
        return serveOffline();
      }
    })
  );
});

function serveOffline() {
  return caches.match(OFFLINE_PAGE).then((cached) => {
    if (cached) return cached;
    return new Response(
      '<html><body style="background:#0d0d0d;color:#ebebeb;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0"><h1>[DG] — offline</h1></body></html>',
      { headers: { 'Content-Type': 'text/html' } }
    );
  });
}
