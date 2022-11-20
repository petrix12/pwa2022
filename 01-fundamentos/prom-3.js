function sumarLento(numero) {
    return new Promise(function(res, rej) {
        setTimeout(function() {
            res(numero + 1)
            //rej('Mensaje de error')
        }, 800)
    });
}

let sumarRapido = (numero) => {
    return new Promise((res, rej) => {
        setTimeout( () => res(numero + 1), 300)
    });
}

function retornaTrue() {
    return true;
}

// Manejando promesas de forma independiente
sumarLento(5).then(console.log);
sumarRapido(10).then(console.log);

// Manejando promesas de forma simultanea
Promise.all([sumarLento(5), sumarRapido(10)])
    .then(console.log)
    .catch(console.log)


let cosas = [sumarLento(5), sumarRapido(10), true, 'Soluciones++', retornaTrue()]
Promise.all(cosas)
    .then(console.log)
    .catch(console.log)