// const CACHE_NAME = 'cache-1';
const CACHE_STATIC_NAME = 'static-v2';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';
const CACHE_DYNAMIC_LIMIT = 50;

function limpiarCache( cacheName, numeroItems ) {
    caches.open( cacheName )
        .then( cache => {
            return cache.keys()
                .then( keys => {
                    if ( keys.length > numeroItems ) {
                        cache.delete(keys[0])
                            .then(limpiarCache(cacheName, numeroItems));
                    }
                });            
        });
}

self.addEventListener('install', e => {
    // Creación del cache estático
    const cacheStatic = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            return cache.addAll([
                './',
                './index.html',
                './css/style.css',
                './img/main.jpg',
                './js/app.js',
                './img/no-img.jpg'
            ]);
        });


    // Creación del cache inmutable
    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME)
        .then(cache => {
            return cache.addAll([
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
            ]);
        });        
    
    // Parar el resto del proceso hasta que el cache esté cargado
    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

self.addEventListener('fetch', e => {
    // ESTRATEGIAS DEL CACHE

    // 1. Cache Only: usada cuando se quiere que toda la aplicación sea servida desde el cache
    // e.respondWith(caches.match(e.request));

    // 2. Cache with network fallback: busca primero en el cache, y si no lo encuentra va a internet
    /* const respuestaCache = caches.match(e.request)
        .then(res => {
            // Si existe en cache, entonces retorna el recurso
            if(res) return res;

            // Si no existe en cache, entonces lo busca en internet
            console.log('No existe', e.request.url);
            return fetch(e.request)
                .then(newRes => {
                    caches.open(CACHE_DYNAMIC_NAME)
                        .then(cache => {
                            cache.put(e.request, newRes);
                            limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
                        });
                    return newRes.clone();
                });
        });

    e.respondWith(respuestaCache); */

    // 3. Cache with network update
    /* const respuestaNetwork = fetch(e.request)
        .then(res => {
            if (!res) return caches.match(e.request);
            // console.log('Fetch', res);
            caches.open(CACHE_DYNAMIC_NAME)
                .then(cache => {
                    cache.put(e.request, res);
                    limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
                });

            return res.clone();
        })
        .catch(err => {
            return caches.match(e.request);
        });
    e.respondWith(respuestaNetwork); */

    // 4. Cache y Network Race: rendimiento crítico. Un paso atrás de la última actualización.
    /* if (e.request.url.includes('bootstrap')) {
        return e.respondWith(caches.match(e.request));
    }
    const respuestaNetworkRace = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            fetch(e.request)
                .then(newRes => cache.put(e.request, newRes));
            return cache.match(e.request);
        });

    e.respondWith(respuestaNetworkRace); */

    // 5. Cache o Network Race
    const respuestaCacheNetworkRace = new Promise((resolve, reject) => {
        let rechazada = false;
        const falloUnaVez = () => {
            if (rechazada) {
                if ( /\.(png|jpg)$/i.test(e.request.url)) {
                    resolve(caches.match('./img/no-img.jpg'));
                } else {
                    reject('No se encontro respuesta');
                }
            } else {
                rechazada = true;
            }
        }

        fetch(e.request).then(res => {
            res.ok ? resolve(res) : falloUnaVez();
        }).catch(falloUnaVez);

        caches.match(e.request).then(res => {
            res ? resolve(res) : falloUnaVez();
        }).catch(falloUnaVez);
    });

    e.respondWith(respuestaCacheNetworkRace);
});