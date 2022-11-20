function sumarUno(numero) {
    console.log(numero);
    let promesa = new Promise(function(res, rej) {
        if (numero >= 7) {
            rej('Número muy alto')
        }
        setTimeout(function() {
            res(numero + 1);
        }, 800);
    });

    return promesa;
}

sumarUno(5)
    .then(sumarUno)
    .then(sumarUno)
    .then(console.log)
    .catch(console.log)
