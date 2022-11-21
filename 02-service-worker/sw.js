self.addEventListener('fetch', event => {
    const resp = fetch(event.request)
        .then(resp => resp.ok ? resp : fetch('img/main.jpg'))
        .catch(err => console.log('Error en:', event.request.url))

    event.respondWith(resp);
});