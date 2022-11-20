// Petición POST
// https://reqres.in/api/users

let usuario = {
    nombre: 'Pedro',
    edad: 50
}

fetch('https://reqres.in/api/users', {
    method: 'POST',
    body: JSON.stringify(usuario),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(resp => resp.json())
.then(console.log)
.catch(err => {
    console.log('Error en la petición');
    console.log(err);
})