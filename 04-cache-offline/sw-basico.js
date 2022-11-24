self.addEventListener('fetch', event => {
    const offlineResponse = fetch('./pages/offline.html');

    const resp = fetch(event.request)
        .catch(() => offlineResponse);
    event.respondWith(resp);
});
