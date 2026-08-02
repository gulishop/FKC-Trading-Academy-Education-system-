// Minimal service worker -- required for Chrome/Android to treat this
// page as an installable PWA. Passes requests straight to the network;
// it does not cache/override any of the app's live price data or APIs.
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // No offline caching -- this app relies on live gold-price data,
    // so serving stale cached responses would be misleading. This
    // listener's presence alone is enough to satisfy install criteria.
});
