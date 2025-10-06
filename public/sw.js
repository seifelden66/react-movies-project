// Simple service worker for caching app shell and OMDb API responses

const SW_VERSION = 'v1';
const STATIC_CACHE = `static-${SW_VERSION}`;
const OMDB_CACHE = `omdb-${SW_VERSION}`;

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/logo192.png',
        '/logo512.png',
        '/favico.png',
      ]).catch(() => undefined),
    ),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== OMDB_CACHE)
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

// Helper: determine if request is for a static asset
function isStaticAsset(request) {
  const url = new URL(request.url);
  if (url.origin !== location.origin) return false;
  return /\.(?:js|css|png|jpg|jpeg|svg|gif|webp|ico|woff2?|ttf|eot)$/i.test(url.pathname);
}

// Helper: OMDb API detection
function isOmdbRequest(request) {
  const url = new URL(request.url);
  return /omdbapi\.com$/i.test(url.hostname);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Cache-first for same-origin static assets
  if (isStaticAsset(request)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const response = await fetch(request);
          if (response && response.status === 200) {
            cache.put(request, response.clone());
          }
          return response;
        } catch (err) {
          return cached || Response.error();
        }
      }),
    );
    return;
  }

  // Stale-while-revalidate for OMDb API
  if (isOmdbRequest(request)) {
    event.respondWith(
      caches.open(OMDB_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const networkPromise = fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => undefined);
        return cached || networkPromise || Response.error();
      }),
    );
    return;
  }

  // Network-first for navigations (HTML)
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(request);
          const cache = await caches.open(STATIC_CACHE);
          cache.put('/', res.clone());
          return res;
        } catch (e) {
          const cache = await caches.open(STATIC_CACHE);
          const cached = await cache.match('/index.html');
          return cached || Response.error();
        }
      })(),
    );
  }
});


