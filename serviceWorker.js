const PRECACHE = "precache-v1";
const RUNTIME = "runtime";

const PRECACHE_URLS = [
    "./",
    "index.html",
    "css/globals.css",
    "css/index.css",
    "js/app.js",
    "js/utils.js",
];

// cache important resources
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(PRECACHE)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    );
});

// clean up old caches
self.addEventListener("activate", (event) => {
    const currentCaches = [PRECACHE, RUNTIME];

    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) =>
                cacheNames.filter(
                    (cacheName) => !currentCaches.includes(cacheName)
                )
            )
            .then((cachesToDelete) =>
                Promise.all(
                    cachesToDelete.map((cacheToDelete) =>
                        caches.delete(cacheToDelete)
                    )
                )
            )
            .then(() => self.clients.claim())
    );
});

// cache new resources & serve old ones
self.addEventListener("fetch", (event) => {
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return caches
                    .open(RUNTIME)
                    .then((cache) =>
                        fetch(event.request).then((response) =>
                            cache
                                .put(event.request, response.clone())
                                .then(() => response)
                        )
                    );
            })
        );
    }
});
