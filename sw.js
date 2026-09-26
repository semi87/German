/*
 * Service worker: makes the site work offline.
 * Everything is fetched from the network first (so updates show up at once)
 * and served from the cache when there is no connection.
 * Bump VERSION when the list of files changes.
 */
var VERSION = "dg-v1";
var FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/style.css",
  "assets/store.js",
  "assets/progress.js",
  "assets/dictionary.js",
  "assets/reading.js",
  "assets/situations.js",
  "assets/app.js",
  "assets/practice.js",
  "assets/leveltest.js",
  "assets/notes.js",
  "assets/study.js",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-180.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(caches.open(VERSION).then(function (cache) { return cache.addAll(FILES); }));
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  // Network first, so pages and scripts always match after an update;
  // the cached copy is used when there is no connection.
  event.respondWith(
    fetch(req).then(function (res) {
      if (res && res.ok) {
        var copy = res.clone();
        caches.open(VERSION).then(function (cache) { cache.put(req.mode === "navigate" ? "index.html" : req, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(req.mode === "navigate" ? "index.html" : req, { ignoreSearch: true });
    })
  );
});
