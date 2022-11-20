// Petición GET
// https://reqres.in/api/users/id

fetch('https://reqres.in/api/users/10000')
    .then(resp => {
        if(resp.ok) {
            return resp.json();
        } else {
            // console.log('No existe usuario con ese id');
            throw new Error('No existe usuario con ese id');
        }
    })
    .then(console.log)
    .catch(err => {
        console.log('Error en la petición');
        console.log(err);
    })