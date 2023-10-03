/* eslint-env serviceworker */

const version = "0.0.2";
const CACHE = "cache-only-" + version;

function fromCache(request) {
    return caches.open(CACHE).
        then((cache) => cache.match(request, {ignoreSearch: true}).
            then((matching) => matching || Promise.reject("request-not-in-cache")));
}

function precache() {
    const filesToCache = self.__WB_MANIFEST.map((e) => e.url);
    return caches.open(CACHE).then((cache) => cache.addAll([
        "./",
        ...filesToCache
    ]));
}

self.addEventListener("install", (evt) => {
    evt.waitUntil(precache());
});

self.addEventListener("install", (evt) => {
    evt.waitUntil(precache().then(() => self.skipWaiting()));
});

function networkOrCache(request) {
    return fetch(request).then((response) => response.ok ? response : fromCache(request))
        .catch(() => fromCache(request));
}

self.addEventListener("fetch", (evt) => {
    evt.respondWith(networkOrCache(evt.request));
});

self.addEventListener("activate", (evt) => {
    evt.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (cacheName !== CACHE) {
                    return caches.delete(cacheName);
                }
            })
        )).then(() => self.clients.claim())
    );
});
