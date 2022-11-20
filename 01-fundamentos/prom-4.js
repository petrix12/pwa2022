function sumarLento(numero) {
    return new Promise(function(res, rej) {
        setTimeout(function() {
            res(numero + 1)
            //rej('Error en sumar lento')
        }, 800)
    });
}

let sumarRapido = (numero) => {
    return new Promise((res, rej) => {
        setTimeout( () => /* res(numero + 1) */ rej('Error en sumar rápido'), 300)
    });
}

Promise.race([sumarLento(5), sumarRapido(10)])
    .then(console.log)
    .catch(console.log)