importScripts('js/sw-utils.js');

const STATIC_CACHE      = 'static-v1';
const DYNAMIC_CACHE     = 'dynamic-v1';
const INMUTABLE_CACHE   = 'inmutable-v1';

const APP_SHELL = [
    './',
    './index.html',
    './style/base.css',
    './js/pouchdb-nightly.js',
    './js/base.js',
    './js/app.js',
    './js/sw-utils.js',
    './style/bg.png',
    './style/plain_sign_in_blue.png'
];

const APP_SHELL_INMUTABLE = [
    'https://cdn.jsdelivr.net/npm/pouchdb@7.3.1/dist/pouchdb.min.js',
    'https://login.persona.org/include.js'
];

// Creación de caches
self.addEventListener('install', e => {
    const cacheStatic = caches.open(STATIC_CACHE).then(cache => cache.addAll(APP_SHELL));
    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => cache.addAll(APP_SHELL_INMUTABLE));

    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

// Limpieza de caches obsoletos
self.addEventListener('activate', e => {
    const limpieza = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key !== STATIC_CACHE && key.includes('static')) {
            //if (key !== CACHE_STATIC_NAME || key !== CACHE_DYNAMIC_NAME || key !== CACHE_INMUTABLE_NAME) {
                return caches.delete(key);
            }

            if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
                return caches.delete(key);
            }
        });
    });

    e.waitUntil(limpieza);
});

// Estrategias del cache
self.addEventListener('fetch', e => {
    const respuesta = caches.match(e.request).then(res => {
        if (res) {
            return res;
        } else {
            // console.log(e.request.url);
            return fetch(e.request).then(newRes => {
                return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
            });
        }

    });

    e.waitUntil(respuesta);
});

/* self.addEventListener('', e => {
}); */
