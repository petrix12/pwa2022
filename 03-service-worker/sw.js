// Ciclo de vida del SW

self.addEventListener('install', event => {
    // Descargar assets
    // Crear cache
    console.log('SW: Instalado');

    const instalacion = new Promise((res, rej) => {
        setTimeout(() => {
            console.log('SW: Instalaciones terminadas');
            self.skipWaiting();
            res();
        }, 1)
    })

    event.waitUntil(instalacion);
    // self.skipWaiting();
});

// Cuando el SW toma el control de la aplicación
self.addEventListener('activate', event => {
    // Borrar cache antiguo
    console.log('SW: Activo y listo para controlar la app');
});

// FETCH: Manejo de peticiones HTTP
self.addEventListener('fetch', event => {
    // Aplicar estrategias del cache
    /* console.log('SW', event.request.url);
    if (event.request.url.includes('https://reqres.in/')) {
        const resp = new Response(`{ ok: false, message: 'json interceptado' }`);
        event.respondWith(resp);
    } */
});

// SYNC: Recuperación de la conexión a internet
self.addEventListener('sync', event => {
    console.log('Tenemos conexión');
    console.log(event);
    console.log(event.tag);
});

// PUSH: Manejar las push notifications
self.addEventListener('push', event => {
    console.log('Notificación recibida');
});
