// Confirmar si podemos utilizar el Service Worker
/* if (navigator.serviceWorker) {
    console.log('Podemos usar aquí el Service Worker');
} */

// Otra forma de confirmar si podemos utilizar el Service Worker
/* if ('serviceWorker' in navigator) {
    console.log('Podemos usar aquí el Service Worker');
} */

// Confirmar si podemos utilizar el Service Worker
if (navigator.serviceWorker) {
    // registar el service worker
    navigator.serviceWorker.register('./sw.js');
}