
# Contenido del curso
## Sección 1: Introducción
### 1. Introducción
+ Sobre la presentación del curso

### 2. ¿Cómo funcionará el curso?
+ Sobre el funcionamiento del curso

### 3. ¿Cómo hacer preguntas?
+ Sobre como hacer preguntas

### 4. Instalaciones necesarias para seguir el curso
+ [Google Chrome](https://www.google.com/chrome)
+ [Extensiones de VSC](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion01/extensiones-vsc.pdf)
+ [Node.js](https://nodejs.org)
+ [Postman](https://www.postman.com)
+ [Visual Studio Code](https://code.visualstudio.com)

### 5. Instalar Git y configuración básica
+ [Git](https://git-scm.com)
+ [Configuración básica de git](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion01/git-configuracion-basica.txt)


## Sección 2: Fundamentos de las aplicaciones web progresivas
### 6. Introducción a la sección
+ Importancia del Service Worker.

### 7. Temas puntuales de la sección
+ Esta sección tocaremos temas puntuales sobre:
    + ¿Por qué construir una PWA?
    + ¿Cómo funciona?
    + Conceptos básicos de una PWA
+ Es importante tenerlos presente porque es común perder el enfoque de lo que es una PWA y que es una aplicación híbrida o bien qué diferencia hay con una aplicación nativa.

### 8. ¿Qué son las aplicaciones web progresivas?
+ Que son y que no son PWA.

### 9. ¿Por qué construir una PWA?
+ Importancia de las PWA.

### 10. Conceptos clave de las PWA
+ Ciclo de vida de un Service Worker.

### 11. Material de la sección
+ [¿Qué son las PWA's?](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion02/1-+que+son+las+pwas.pdf)
+ [¿Por qué construir una PWA?](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion02/2-+Por+que+construir+una+pwa.pdf)
+ [Conceptos clave de las PWA](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion02/3-+Conceptos+clave+de+las+PWA.pdf)


## Sección 3: Reforzamiento Promesas, Fetch API y HttpServer
### 12. Introducción a la sección
+ Importacia de dominar las Promesas y los Fetch API.

### 13. Temas puntuales de la sección
+ Antes de entrar en los temas de las PWAs y comenzar a crearlas, necesito que todos hablemos el mismo idioma sobre los conceptos de las promesas, fetch api y que sepan cómo levantar rápidamente un servidor para probar nuestras aplicaciones.
+ Aquí veremos:
    + Promesas
    + Promesas en cadena
    + Promise.all
    + Promise.race
    + Fetch API
    + Gets
    + Posts
    + Fetch de Blobs
    + http-server
+ Y otros temas importantes para que el curso no lo sientan complicado.

### 14. Inicio del proyecto y recomendación
+ [npm http-server](https://www.npmjs.com/package/http-server)
+ [index.html base](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion03/index.html)
1. Crear carpeta **01-fundamentos** como proyecto.
2. Crear **01-fundamentos\index.html**:
    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <h1>Fundamentos</h1>
    </body>
    </html>
    ```
3. En caso de no disponer de un localhost, instalar servidor:
    + $ npm install --global http-server
4. Para levantar el proyecto **01-fundamentos**:
    + $ cd 01-fundamentos
    + $ http-server
        ::: tip Nota
        En caso de querer indicar el puerto:
        + $ http-server -p 8081
        <hr/>
        :::

### 15. Promesas 101: Problemática
1. Crear **01-fundamentos\prom-1.js**:
    ```js
    function sumarUno(numero, callback) {
        if (numero >= 7) {
            callback('Número muy alto');
            return;
        }
        setTimeout(function() {
            // return numero + 1;
            callback(null, numero + 1);
        }, 800)
    }

    sumarUno(5, function(error, nuevoValor) {
        if (error) {
            console.log(error);
            return;
        }
        sumarUno(nuevoValor, function(error, nuevoValor2) {
            if (error) {
                console.log(error);
                return;
            }
            sumarUno(nuevoValor2, function(error, nuevoValor3) {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(nuevoValor3);
            });
        });
    })
    ```
    ::: warning Advertencia
    Esta es una mala práctica de escribir código. Se le conoce como **callback Hell**.
    El callback Hell se produce cuando encadenamos muchas operaciones asíncronas seguidas.
    :::

### 16. Resolución del problema usando promesas
1. Crear **01-fundamentos\prom-2.js**:
    ```js
    function sumarUno(numero) {
        let promesa = new Promise(function(res, rej) {
            setTimeout(function() {
                res(numero + 1);
            }, 800);
        });

        return promesa;
    }

    sumarUno(5).then(nuevoValor => {
        console.log(nuevoValor)
        return sumarUno(nuevoValor)
    }).then(nuevoValor => {
        console.log(nuevoValor)
        return sumarUno(nuevoValor)
    }).then(nuevoValor => {
        console.log(nuevoValor)
    })    
    ```
    ::: tip Nota
    Esta es una forma más elegante de resolver el problema anterior.
    :::

### 17. Manejo de errores en las promesas
1. Modificar **01-fundamentos\prom-2.js**:
    ```js
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
    ```
    ::: tip Nota
    Esta es una forma aún más elegante de resolver el problema anterior.
    :::

### 18. Promise All
1. Crear **01-fundamentos\prom-3.js**:
    ```js
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
        .catch(console.log);
    ```

### 19. Promise Race
1. Crear **01-fundamentos\prom-4.js**:
    ```js
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
    ```
    ::: tip Nota
    Mientras que **Promise.all** regresa todas las promesas, **Promise.race** regresa solamente la primera que se resuelva.
    :::

### 20. Material adicional sobre promesas
+ [Estados de las promesas](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion03/estados+de+las+promesas.pdf).
+ **Promesas**: página de Mozilla MDN:
    + [Promesas](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise)
    + [Promise.all()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
    + [Promise.race()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
+ Hay otros métodos que no se explicaron como el **Promise.resolve()** y **Promise.reject()**, pero cuando sean necesarios se explicaran en los videos respectivos.

### 21. Origenes del Fetch - XMLHttpRequest
+ [REQRES](https://reqres.in).
1. Modificar **01-fundamentos\index.html**:
    ```html
    <!-- ... -->
    <body>
        <!-- ... -->
        <script src="./fetch-1.js"></script>
    </body>
    <!-- ... -->
    ```
2. Crear **01-fundamentos\fetch-1.js**:
    ```js
    let request = new XMLHttpRequest();

    request.open('GET', 'https://reqres.in/api/users', true);
    request.send(null);

    request.onreadystatechange = function(state) {
        if(request.readyState === 4) {
            let resp = request.response;
            let respObj = JSON.parse(resp);
            console.log(respObj);
        }
    }
    ```
    ::: warning Advertencia
    Esta es la manera antigua de realizar peticiones http.
    :::

### 22. Fetch API
+ [Chrome Cors Plugin](https://chrome.google.com/webstore/search/cors).
+ [Fetch Methods](https://developer.mozilla.org/en-US/docs/Web/API/Response).
1. Modificar **01-fundamentos\index.html**:
    ```html
    <!-- ... -->
    <body>
        <!-- ... -->
        <script src="./fetch-2.js"></script>
    </body>
    <!-- ... -->
    ```
2. Crear **01-fundamentos\fetch-2.js**:
    ```js
    // Petición GET
    // https://reqres.in/api/users

    fetch('https://reqres.in/api/users')
        .then(res => res.json())
        .then(respObj => {
            console.log(respObj);
            console.log(respObj.page);
            console.log(respObj.per_page);
        })
    ```
::: tip
Ejemplo para vaciar el código de una página, en tú página
```js
// Ejemplo para vaciar el código de una página, en tú página
// Para ejeuctar este código es necesario activar CORS
fetch('https://www.wikipedia.org')
    .then(resp => resp.text())
    .then(html => {
        document.open();
        document.write(html);
        document.close();
    });
```
:::

### 23. Fetch POST / PUT
+ [REQRES](https://reqres.in).
1. Modificar **01-fundamentos\index.html**:
    ```html
    <!-- ... -->
    <body>
        <!-- ... -->
        <script src="./fetch-3.js"></script>
    </body>
    <!-- ... -->
    ```
2. Crear **01-fundamentos\fetch-3.js**:
    ```js
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
    ```

### 24. Fetch Blob
1. Modificar **01-fundamentos\index.html**:
    ```html
    <!-- ... -->
    <body>
        <!-- ... -->
        <img src="" alt="">
        <script src="./fetch-4.js"></script>
    </body>
    <!-- ... -->
    ```
2. Crear **01-fundamentos\fetch-4.js**:
    ```js
    let img = document.querySelector('img')

    fetch('superman.png')
        .then(resp => resp.blob())
        .then(imagen => {
            let imgPath = URL.createObjectURL(imagen);
            img.src = imgPath;
            img.alt = "Supermán";
        })    
    ```

### 25. Response.clone()
1. Modificar **01-fundamentos\index.html**:
    ```html
    <!-- ... -->
    <body>
        <h1>Fundamentos</h1>
        <script src="./fetch-5.js"></script>
    </body>
    <!-- ... -->
    ```
2. Crear **01-fundamentos\fetch-5.js**:
    ```js
    // Petición GET
    // https://reqres.in/api/users/id

    fetch('https://reqres.in/api/users/1')
        .then(res => {
            res.clone().json().then(usuario => {
                console.log(usuario.data)
            });

            res.clone().json().then(usuario => {
                console.log(usuario.data)
            });

            res.json().then(usuario => {
                console.log(usuario.data)
            });
        })    
    ```

### 26. Manejo de respuestas y errores
1. Modificar **01-fundamentos\fetch-5.js**:
    ```js
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
    ```

### 27. Leer archivos HTML
1. Modificar **01-fundamentos\index.html**:
    ```html
    <!-- ... -->
    <body>
        <!-- ... -->
        <script src="./fetch-6.js"></script>
    </body>
    <!-- ... -->
    ```
2. Crear **01-fundamentos\no-encontrado.html**:
    ```html
    <h1>El archivo no fue encontrado</h1>

    <p>:(</p>    
    ```
3. Crear **01-fundamentos\fetch-6.js**:
    ```js
    fetch('no-encontrado.html')
        .then(resp => resp.text())
        .then(html => {
            let body = document.querySelector('body');
            body.innerHTML = html;
        })
        .catch(error => {
            console.log('Error en la petición');
            console.log(error);
        })    
    ```

### 28. Actualización menor
+ Actualización menor:
    + API de StarWars https://swapi.dev/api, (en el video el URL dice: https://swapi.co/api)

### 29. Tarea: Reforzamiento sobre las promesas y fetch
1. Modificar **01-fundamentos\index.html**:
    ```html
    <!-- ... -->
    <body>
        <!-- ... -->
        <script src="./tarea.js"></script>
    </body>
    <!-- ... -->
    ```
2. Crear **01-fundamentos\tarea.js**:
    ```js
    // Tarea sobre promesas y fetch
    // Realice resolución de cada ejercicio,

    // compruebe el resultado en la consola y posteriormente
    // siga con el siguiente.

    // Comente TODO el código del ejercicio anterior
    // antes de continuar con el siguiente.

    // ==============================================
    // Ejercicio #1
    // ==============================================
    /*
    Realizar un llamado FETCH a la siguiente API
    https://swapi.dev/api/people/1/
    Imprima en consola el nombre y género de la persona.
    */

    // Resolución de la tarea #1
    fetch('https://swapi.dev/api/people/1')
        .then(resp => {
            if(resp.ok) {
                return resp.json();
            } else {
                // console.log('No existe usuario con ese id');
                throw new Error('No existe usuario con ese id');
            }
        })
        .then((people) => {
            console.log(people.name)
            console.log(people.gender)
        })
        .catch(err => {
            console.log('Error en la petición');
            console.log(err);
        })    

    // ==============================================
    // Ejercicio #2
    // ==============================================
    /*
    Similar al ejercicio anterior... haga un llamado a la misma api
    (puede reutilizar el código )
    https://swapi.dev/api/people/1/
    
    Pero con el nombre y el género, haga un posteo
    POST a: https://reqres.in/api/users

    Imprima en consola el objeto y asegúrese que tenga
    el ID y la fecha de creación del objeto
    */

    // Resolución de la tarea #2
    let user = {
        nombre: 'Petrix',
        gender: 'male'
    }

    fetch('https://reqres.in/api/users', {
        method: 'POST',
        body: JSON.stringify(user),
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
    ```

### 30. Documentaciones adicionales
+ [URL - CreateObjectUrl](https://developer.mozilla.org/en-US/docs/Web/API/URL)
+ [XmlHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState)
+ [Methods del response](https://developer.mozilla.org/en-US/docs/Web/API/Response)
+ [Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch)

### 31. Código fuente de la sección
+ **[Código fuente de esta sección](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion03/01-fundamentos.zip)**.


## Sección 4: Service Worker y Fetch Event
### 32. Introducción a la sección
+ El papel de del Service Worker en una PWA.

### 33. Temas puntuales de la sección
+ Resumen puntual de la sección:
    + Esta sección está enfocada principalmente en el tema del service worker, ¿cómo instalarlo? y ¿qué podemos hacer con él?
    + También aprenderemos a modificar respuestas que es un tema crucial cuando llegues al tema del manejo del cache y respuestas offline.
    + Pero se necesita que se comprenda qué puede hacer el service worker y sobre todo, el poder que tiene sobre toda una aplicación web.

### 34. Introducción al Service Worker
+ Sobre lo que puede hacer el Service Worker.

### 35. Inicio del proyecto - Service Worker básico
+ [Base del proyecto a desarrollar en esta sección](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion04/02-service-worker.zip).
1. Crear **02-service-worker\index.html**:
    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Mi PWA</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body class="container p-3">
        <img src="img/main.jpg" alt="Vías del tren" class="img-fluid">
        <h1>Bienvenido</h1>
        <hr>
        <p>Las PWAs son el siguiente paso a las páginas y aplicaciones web.</p>
        <p>Cargan sumamente rápido y no necesitan conexión a internet para trabajar</p>
        <script src="js/app.js"></script>
    </body>
    </html>    
    ```
2. Crear **02-service-worker\css\style.css**:
    ```css
    html, body {
        height: 100%;
        background-color: #1D2125;
    }

    h1, h2, h3, h4, h5 {
        color: white;
    }

    hr {
        background-color: white;
    }

    p{
        color: #D1D1D1;
    }    
    ```

### 36. Instalación del Service Worker
+ [Can I use service worker](https://caniuse.com/?search=service%20worker)
1. Crear **02-service-worker\js\app.js**:
    ```js
    // Confirmar si podemos utilizar el Service Worker
    if (navigator.serviceWorker) {
        // registar el service worker
        navigator.serviceWorker.register('./sw.js');
    }
    ```
    ::: tip Distintas formas de confirmar si el navegador acepta Service Worker
    + Forma 1:
    ```js
    if (navigator.serviceWorker) {
        console.log('Podemos usar aquí el Service Worker');
    }    
    ```
    + Forma 2:
    ```js
    if ('serviceWorker' in navigator) {
        console.log('Podemos usar aquí el Service Worker');
    }    
    ```
    :::
2. Crear **C:\laragon\www\pwa2022\02-service-worker\sw.js**:
    ```js
    console.log('sw s++');
    ```
3. Crear **02-service-worker\pages\no-encontrado.html**:
    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Mi PWA</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link rel="stylesheet" href="../css/style.css">
    </head>
    <body class="container p-3">
        <h1>No encontrado</h1>
        <script src="../js/app.js"></script>
    </body>
    </html>
    ```

### 37. Service Worker - Fetch Event
+ [renombrar-a-.jshintrc.zip](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion04/renombrar-a-.jshintrc.zip)
1. Modificar **02-service-worker\sw.js**:
    ```js
    self.addEventListener('fetch', event => {
        if(event.request.url.includes('style.css')) {
            event.respondWith(null);
        } else {
            event.respondWith(fetch(event.request));
        }
    });    
    ```

### 38. Formas válidas para realizar peticiones desde el evento Fetch
1. Modificar **02-service-worker\sw.js**:
    ```js
    self.addEventListener('fetch', event => {
        if (event.request.url.includes('.jpg')) {
            console.log(event.request.url);
            // let fotoReq = fetch('img/main.jpg');
            // let fotoReq = fetch(event.request.url);
            let fotoReq = fetch(event.request);
            event.respondWith(fotoReq);
        }
    });    
    ```

### 39. Modificando la respuesta de la petición Fetch
+ [MDN Response](https://developer.mozilla.org/es/docs/Web/API/Response).
1. Modificar **02-service-worker\sw.js**:
    ```js
    self.addEventListener('fetch', event => {
        if (event.request.url.includes('style.css')) {
            let respuesta = new Response(`
                body {
                    background-color: red !important;
                    color: pink;
                }
            `, {
                headers: {
                    'Content-Type': 'text/css'
                }
            });
            event.respondWith(respuesta);
        }
    });    
    ```

### 40. Tarea - Interceptar y modificar peticiones
1. Modificar **02-service-worker\sw.js**:
    ```js 
    self.addEventListener('fetch', event => {
        if (event.request.url.includes('main.jpg')) {
            let respuesta = fetch('img/main-patas-arriba.jpg');
            event.respondWith(respuesta);
        }
    });       
    ```

### 41. Manejo de errores en el Fetch Event
1. Modificar **02-service-worker\index.html**:
    ```html
    <!-- ... -->
    <body class="container p-3">
        <img src="img/imagen-no-existe.jpg" alt="Vías del tren" class="img-fluid">
        <!-- ... -->
    </body>
    <!-- ... -->
    ```
2. Modificar **02-service-worker\sw.js**:
    ```js
    self.addEventListener('fetch', event => {
        const resp = fetch(event.request)
            .then(resp => resp.ok ? resp : fetch('img/main.jpg'))
            .catch(err => console.log('Error en:', event.request.url))

        event.respondWith(resp);
    });        
    ```
    ::: warning Advertencia
    Esta solución está incompleta, porque todo error detectado por el Service Worker será reemplazado por una imagen.
    :::

### 42. Nota: Manejo de errores en el Fetch
+ Hay otras formas de manejar errores que veremos cuando entremos a los temas del Cache.
+ Pero por ahora dejaremos las bases de lo que necesitaremos más adelante.
+ La idea es que poco a poco comencemos a implementar más cosas en nuestro Service Worker y aplicación web

### 43. Código fuente de la sección
+ **[Código fuente](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion04/02-service-worker-fin.zip)**-

### Cuestionario 1: Examen sobre Service Workers
+ Pregunta 1: ¿Qué hace esta instrucción?
    ```js
    if ( navigator.serviceWorker ) { .... }
    ```
    **Respuesta**: Comprueba si el navegador puede trabajar xon service workers.
+ Pregunta 2: ¿Qué hace el siguiente código?
    ```js
    navigator.serviceWorker.register('/sw.js')
    ```
    **Respuesta**: Crea o actualiza el registro del service worker.
+ Pregunta 3: ¿El navegador web instalará un nuevo Service Worker si detecta que hubo al menos un simple cambio en el archivo de JavaScript del Service Worker?
    **Respuesta**: Verdadero.
+ Pregunta 4: ¿Cuando se dispara este evento en el Service Worker?
    ```js
    self.addEventListener('fetch', event => { ...
    ```
    **Respuesta**: Cuando en la aplicación controlada por el SW recibe una solicitud de red.
+ Pregunta 5: ¿Qué hace el siguiente código?
    ```js
    self.addEventListener('fetch', event => {
        const resp = fetch( event.request );
        event.respondWith(resp);
    
    }); 
    ```
    **Respuesta**: Intercepta la petición y el Service Worker solicita la información a la web y esa información es la que envía al navegador web del cliente.
+ Pregunta 6: ¿Qué pasa si ejecutamos muchas veces esta instrucción?
    ```js
    if ( navigator.serviceWorker ) {
        navigator.serviceWorker.register('/sw.js');
        navigator.serviceWorker.register('/sw.js');
        navigator.serviceWorker.register('/sw.js');
        navigator.serviceWorker.register('/sw.js');
    }
    ```
    **Respuesta**: Actualiza el registro del Service Worker 4 veces.
+ Pregunta 7: ¿Qué pasa si el Service Worker se encuentra en este directorio y se registra la instalación así en el app.js que se encuentra en otro directorio?
    ```js
    navigator.serviceWorker.register('../pages/sw.js');
    ```
    **Respuesta**: El Service Worker tendrá unicamente control sobre lo que sucedad en la carpeta pages.
+ Pregunta 8: ¿El Service Worker actúa como un proxy entre nuestra aplicación y el internet?
    **Respuesta**: Verdadero.
+ Pregunta 9: ¿El Service Worker puede funcionar en cualquier hosting en internet, que sirva la aplicación usando protocolo HTTP?
    **Respuesta**: Falso.
+ Pregunta 10: ¿Qué hace esta instrucción en un evento FETCH en el Service Worker?
    ```js
    event.respondWith(respuesta);
    ```
    **Respuesta**: Responde al nevegador web lo que se encuentra en la respuesta cuando se solicite algún recurso web.


## Sección 5: Ciclo de vida de un Service Worker y los listeners más comunes
### 44. Introducción a la sección
+ Más sobre Service Worker.

### 45. Temas puntuales de la sección
+ Esta sección tiene un resumen de los principales listeners usado dentro de un service worker, el objetivo es enseñar cómo y en qué momento son invocados, para posteriormente utilizarlos en una aplicación que desarrollaremos, que requiere estos conocimientos.
+ Entre los listeners más comunes están:
    + fetch
    + sync
    + install
    + activate
    + push
+ Luego cuando entremos a la sección de push notifications, trabajaremos con otros específicamente relacionados con las interacciones con las notificaciones push, pero por ahora comencemos con estos.

### 46. Inicio del proyecto - Ciclo de Vida y Listeners
+ [03-service-worker.zip](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion05/03-service-worker.zip).
1. Crear **03-service-worker\css\style.css**:
    ```css
    html, body {
        height: 100%;
        background-color: #1D2125;
    }

    h1,h2,h3,h4,h5 {
        color: white;
    }

    hr {
        background-color: white;
    }

    p{
        color: #D1D1D1;
    }    
    ```
2. Crear **03-service-worker\js\app.js**:
    ```js
    // Detectar si podemos usar Service Workers
    if ( navigator.serviceWorker ) {
        navigator.serviceWorker.register('./sw.js');
    }    
    ```    
3. Crear **03-service-worker\index.html**:
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Mi PWA</title>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body class="container p-3">
        <img src="img/main.jpg" alt="Vías del tren" class="img-fluid">
        
        <h1>Bienvenido</h1>
        <hr>

        <p>Las PWAs son el siguiente paso a las páginas y aplicaciones web.</p>
        <p>Cargan sumamente rápido y no necesitan conexión a internet para trabajar</p>
        <script src="js/app.js"></script>
    </body>
    </html>    
    ```

### 47. Service Worker: Install
1. Crear **03-service-worker\sw.js**:
    ```js
    // Ciclo de vida del SW

    self.addEventListener('install', event => {
        // Descargar assets
        // Crear cache
        console.log('SW: Instalando');
    });    
    ```

### 48. Service Worker: Activate
1. Modificar **03-service-worker\sw.js**:
    ```js
    // Ciclo de vida del SW

    self.addEventListener('install', event => {
        // Descargar assets
        // Crear cache
        console.log('SW: Instalado');
        // self.skipWaiting();
    });

    // Cuando el SW toma el control de la aplicación
    self.addEventListener('activate', event => {
        // Borrar cache antiguo
        console.log('SW: Activo y listo para controlar la app');
    });
    ```

### 49. event.waitUntil( );
1. Modificar **03-service-worker\sw.js**:
    ```js
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
            }, 1000)
        })

        event.waitUntil(instalacion);
        // self.skipWaiting();
    });

    // Cuando el SW toma el control de la aplicación
    self.addEventListener('activate', event => {
        // Borrar cache antiguo
        console.log('SW: Activo y listo para controlar la app');
    });    
    ```

### 50. Service Worker: Fetch
1. Modificar **03-service-worker\js\app.js**:
    ```js
    // Detectar si podemos usar Service Workers
    if ( navigator.serviceWorker ) {
        navigator.serviceWorker.register('./sw.js');
    }

    fetch('https://reqres.in/api/users')
        .then(resp => resp.text())
        .then(console.log);    
    ```
2. Modificar **03-service-worker\sw.js**:
    ```js
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
        console.log('SW', event.request.url);
        if (event.request.url.includes('https://reqres.in/')) {
            const resp = new Response(`{ ok: false, message: 'json interceptado' }`);
            event.respondWith(resp);
        }
    });    
    ```

### 51. Service Worker: Sync
+ [Can I use syncmanager](https://caniuse.com/?search=syncmanager).
1. Modificar **03-service-worker\js\app.js**:
    ```js
    // Detectar si podemos usar Service Workers
    if ( navigator.serviceWorker ) {
        navigator.serviceWorker.register('./sw.js')
            .then(req => {
                setTimeout(() => {
                    req.sync.register('posteo-nodejs');
                    console.log('Se enviaron post sobre node.js al server')
                }, 3000)
            });
    }

    //if (window.SyncManager) {}  
    ```
2. Modificar **03-service-worker\sw.js**:
    ```js
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
    ```

### 52. Service Worker: Push
1. Modificar **03-service-worker\js\app.js**:
    ```js
    // Detectar si podemos usar Service Workers
    if ( navigator.serviceWorker ) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => {
                Notification.requestPermission().then(result => {
                    console.log(result);
                    reg.showNotification('Soluciones++');
                });
            });
    }
    ```
2. Modificar **03-service-worker\sw.js**:
    ```js
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
    ```

### 53. Código fuente de la sección
+ **[Código fuente](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion05/03-service-worker-fin.zip)**.


### Cuestionario 2: Examen sobre listeners y ciclo de vida de un Service Worker
+ Pregunta 1: ¿Qué hace el siguiente código?
    ```js
    Notification.requestPermission()
    ```
    **Respuesta**: Simplemente pide permiso al usuario de recibir notificaciones.
+ Pregunta 2: En este listener del Service Worker, aparte de interceptar peticiones, ¿Qué es lo más común que se realiza aquí?
    ```js
    self.addEventListener('fetch', event => { /* ... */});
    ```
    **Respuesta**: Aplicar las estrategias del cache.
+ Pregunta 3: ¿Cuál listener es el encargado de recibir notificaciones?
    **Respuesta**: push
+ Pregunta 4: ¿Qué hace el event.waitUntil?
    ```js
    event.waitUntil( .... );
    ```
    **Respuesta**: Espera a que el listener resuelva la promesa o tarea que se encuentra en los ....
+ Pregunta 5: ¿Cuales son los pasos que suceden cuando NO existe un Service Worker previo?
    **Respuesta**: Se registra, descarga, instala y activa.


## Sección 6: Estrategias de Cache y Offiline Mode
### 54. Introducción a la sección
+ Sobre estrategias del cache para construir aplicaciones que soporten un internet inestable.

### 55. Temas puntuales de la sección
+ Resumen puntual de la sección:
    + Este es quizá, el tema más importante después del service worker, para una PWA. Es vital saber cómo funcionará nuestra aplicación para poder aplicar una estrategia del manejo del cache eficiente que sirva para brindarle al usuario final la mejor experiencia posible.
    + Aquí aprenderemos a trabajar cuando nuestra aplicación no tiene conexión a internet y cómo podemos servir archivos, inclusive si estos nunca se han cargado en el HTML, tengan presente que aunque existen estrategias explícitas, no quiere decir que no podamos personalizarlas para trabajarlas para que se adapten mejor a nuestras necesidades.
    + Aquí aprenderemos 5 estrategias comunes y luego implementaremos una mezcla para poder resolver a las necesidades particulares de nuestra aplicación

### 56. Inicio del proyecto y respuesta offline básica
+ **[04-cache-offline-inicio.zip](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion06/04-cache-offline-inicio.zip)**.
1. Crear **04-cache-offline\index.html**:
    ```html
    <!DOCTYPE html>
    <html lang="extends">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Mi PWA</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body class="container p-3">
        <img src="img/main.jpg" alt="Vías del tren" class="img-fluid">
        <h1>Bienvenido</h1>
        <hr>

        <p>Las PWAs son el siguiente paso a las página</p>
        <p>Cargan sumamente rápido y no necesitan conexión a internet para trabajar</p>

        <script src="js/app.js"></script>
    </body>
    </html>    
    ```
2. Crear **04-cache-offline\js\app.js**:
    ```js
    if ( navigator.serviceWorker ) {
        navigator.serviceWorker.register('./sw.js');
    }    
    ```
3. Crear **04-cache-offline\css\style.css**:
    ```css
    html, body {
        height: 100%;
        background-color: #1D2125;
    }

    h1,h2,h3,h4,h5 {
        color: white;
    }

    hr {
        background-color: white;
    }

    p{
        color: #D1D1D1;
    }    
    ```
4. Crear **04-cache-offline\sw.js**:
    ```js
    self.addEventListener('fetch', event => {
        // Para cada petición fetch regresa justo lo que se está solicitando
        // Pero será el Service Worker quién haga la petición
        // event.respondWith(fetch(event.request));

        // Ahora previendo que pueda fallar el request
        const offlineResponse = new Response(`
            Bienvenido a Soluciones++
            Se requiere internet para ver esta página
        `);
        const resp = fetch(event.request)
            .catch(() => offlineResponse);
        event.respondWith(resp);
    });    
    ```

### 57. Respuesta offline HTML String
1. Modificar **04-cache-offline\sw.js**:
    ```js
    self.addEventListener('fetch', event => {
        const offlineResponse = new Response(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Mi PWA</title>
            </head>
            <body class="container p-3">
                <h1>Bienvenido a Soluciones++</h1>
                <p>Se requiere internet para ver esta página</p>
            </body>
            </html>        
        `, {
            headers: {
                'Content-Type': 'text/html'
            }
        });

        const resp = fetch(event.request)
            .catch(() => offlineResponse);
        event.respondWith(resp);
    });    
    ```

2. Crear **04-cache-offline\pages\offline.html**:
    ```html
    <!DOCTYPE html>
    <html lang="extends">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Mi PWA</title>
        <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"> -->
        <!-- <link rel="stylesheet" href="css/style.css"> -->
    </head>
    <body class="container p-3">
        <!-- <img src="img/main.jpg" alt="Vías del tren" class="img-fluid"> -->
        <h1>Bienvenido a Soluciones++ (Offline)</h1>
        <hr>

        <p>Se requiere internet para ver esta página</p>

        <!-- <script src="js/app.js"></script> -->
    </body>
    </html>    
    ```
3. Volver a Modificar **04-cache-offline\sw.js**:
    ```js
    self.addEventListener('fetch', event => {
        const offlineResponse = fetch('./pages/offline.html');

        const resp = fetch(event.request)
            .catch(() => offlineResponse);
        event.respondWith(resp);
    });    
    ```
    ::: warning Advertencia
    El último código escrito en el **sw.js** va a fallar, ya que se requieren de estrategias del cache para lograr renderizar la página **offline.html**.
    :::

### 58. Introducción al cache storage
+ **[CacheStorage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage)**.
1. Modificar **04-cache-offline\js\app.js**:
    ```js
    if ( navigator.serviceWorker ) {
        navigator.serviceWorker.register('./sw.js');
    }

    if (window.caches) {
        // Crear cache
        caches.open('prueba-1');
        caches.open('prueba-2');

        // Verificar si existe un cache
        caches.has('prueba-3')
            .then(existe => console.log(existe));

        // Borrar cache
        caches.delete('prueba-2')
            .then(console.log);

        
        // Manipulación de cache
        caches.open('caches-v1.1')
            .then(cache => {
                //cache.add('/index.html');

                cache.addAll([
                    './index.html',
                    './css/style.css',
                    './img/main.jpg'
                ]).then(() => {
                    // eliminar estilo
                    cache.delete('/css/style.css');
                    // modificar el index
                    cache.put('index.html', new Response(`
                        Soluciones++
                    `));
                });

                // Preguntar si existe un archivo
                cache.match('./index.html')
                    .then(res => {
                        res.text().then(console.log);
                    });
            });

        // Obtener todos los caches
        caches.keys().then(keys => console.log(keys));
    }    
    ```

### 59. Guardar el APP SHELL a la hora de instalar SW
1. Modificar **04-cache-offline\js\app.js**:
    ```js
    if ( navigator.serviceWorker ) {
        navigator.serviceWorker.register('./sw.js');
    }    
    ```
2. Renombrar **04-cache-offline\sw.js** a **04-cache-offline\sw-basico.js**.
3. Crear nuevamente **Modificar **04-cache-offline\sw.js**:
    ```js
    self.addEventListener('install', e => {
        // Creación del cache
        const cachePromise = caches.open('cache-1')
            .then(cache => {
                return cache.addAll([
                    './index.html',
                    './css/style.css',
                    './img/main.jpg',
                    './js/app.js',
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
                ]);
            });
        
        // Parar el resto del proceso hasta que el cache esté cargado
        e.waitUntil(cachePromise);
    });
    ```
::: tip Nota
El APP SHELL esto lo necesario que necesita una aplicación para que funcione, como los archivos de estilos, los archivos de script y las imagenes, en otras palabras, todos los recursos principales requeridos por la aplicación.
:::
4. Modificar **04-cache-offline\index.html**:
    ```html
    <!-- ... -->
    <head>
        <!-- ... -->
        <title>Mi PWA</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" >
        <link rel="stylesheet" href="css/style.css">
    </head>
    <!-- ... -->
    ```

### 60. Estrategia: Cache Only
1. Modificar **04-cache-offline\sw.js**:
    ```js
    self.addEventListener('install', e => {
        // Creación del cache
        const cachePromise = caches.open('cache-1')
            .then(cache => {
                return cache.addAll([
                    './',
                    './index.html',
                    './css/style.css',
                    './img/main.jpg',
                    './js/app.js',
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
                ]);
            });
        
        // Parar el resto del proceso hasta que el cache esté cargado
        e.waitUntil(cachePromise);
    });

    self.addEventListener('fetch', e => {
        // ESTRATEGIAS DEL CACHE

        // 1. Cache Only: usada cuando se quiere que toda la aplicación sea servida desde el cache
        e.respondWith(caches.match(e.request));
    });    
    ```



### 61. Estrategia: Cache with network fallback
1. Modificar **04-cache-offline\sw.js**:
    ```js
    const CACHE_NAME = 'cache-1';

    self.addEventListener('install', e => {
        // Creación del cache
        const cachePromise = caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll([
                    './',
                    './index.html',
                    './css/style.css',
                    './img/main.jpg',
                    './js/app.js',
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
                ]);
            });
        
        // Parar el resto del proceso hasta que el cache esté cargado
        e.waitUntil(cachePromise);
    });

    self.addEventListener('fetch', e => {
        // ESTRATEGIAS DEL CACHE

        // 1. Cache Only: usada cuando se quiere que toda la aplicación sea servida desde el cache
        // e.respondWith(caches.match(e.request));

        // 2. Cache with network fallback: busca primero en el cache, y si no lo encuentra va a internet
        const respuestaCache = caches.match(e.request)
            .then(res => {
                // Si existe en cache, entonces retorna el recurso
                if(res) return res;

                // Si no existe en cache, entonces lo busca en internet
                console.log('No existe', e.request.url);
                return fetch(e.request)
                    .then(newRes => {
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(e.request, newRes);
                            });
                        return newRes.clone();
                    });
            });

        e.respondWith(respuestaCache);
    });    
    ```

### 62. Cache dinámico - Optimizaciones
1. Modificar **04-cache-offline\sw.js**:
    ```js
    // const CACHE_NAME = 'cache-1';
    const CACHE_STATIC_NAME = 'static-v1';
    const CACHE_DYNAMIC_NAME = 'dynamic-v1';
    const CACHE_INMUTABLE_NAME = 'inmutable-v1';

    self.addEventListener('install', e => {
        // Creación del cache estático
        const cacheStatic = caches.open(CACHE_STATIC_NAME)
            .then(cache => {
                return cache.addAll([
                    './',
                    './index.html',
                    './css/style.css',
                    './img/main.jpg',
                    './js/app.js'
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
        const respuestaCache = caches.match(e.request)
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
                            });
                        return newRes.clone();
                    });
            });

        e.respondWith(respuestaCache);
    });
    ```

### 63. Limitar el cache dinámico
1. Modificar **04-cache-offline\index.html**:
    ```html
    <!DOCTYPE html>
    <html lang="extends">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Mi PWA</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" >
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body class="container p-3">
        <img src="img/main.jpg" alt="Vías del tren" class="img-fluid">
        <img src="https://cdn.pixabay.com/photo/2016/11/19/15/32/code-1839877_960_720.jpg" alt="Vías del tren" class="img-fluid">
        <img src="https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_960_720.jpg" alt="Vías del tren" class="img-fluid">
        <img src="https://cdn.pixabay.com/photo/2016/11/19/14/16/man-1839500_960_720.jpg" alt="Vías del tren" class="img-fluid">
        <img src="https://cdn.pixabay.com/photo/2018/08/10/15/43/woman-3597095_960_720.jpg" alt="Vías del tren" class="img-fluid">
        <img src="https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536_960_720.jpg" alt="Vías del tren" class="img-fluid">
        <img src="https://cdn.pixabay.com/photo/2015/09/05/20/02/coding-924920_960_720.jpg" alt="Vías del tren" class="img-fluid">
        <img src="https://cdn.pixabay.com/photo/2017/08/10/08/47/laptop-2620118_960_720.jpg" alt="Vías del tren" class="img-fluid">
        <img src="https://cdn.pixabay.com/photo/2017/09/26/15/13/computer-2788918_960_720.jpg" alt="Vías del tren" class="img-fluid">
        <img src="https://cdn.pixabay.com/photo/2020/04/08/15/50/tv-5017870_960_720.jpg" alt="Vías del tren" class="img-fluid">
        <img src="https://cdn.pixabay.com/photo/2013/04/10/10/35/fire-102450_960_720.jpg" alt="Vías del tren" class="img-fluid">
        <h1>Bienvenido</h1>
        <hr>

        <p>Las PWAs son el siguiente paso a las página</p>
        <p>Cargan sumamente rápido y no necesitan conexión a internet para trabajar</p>

        <script src="js/app.js"></script>
    </body>
    </html>    
    ```
2. Modificar **04-cache-offline\sw.js**:
    ```js
    // const CACHE_NAME = 'cache-1';
    const CACHE_STATIC_NAME = 'static-v2';
    const CACHE_DYNAMIC_NAME = 'dynamic-v1';
    const CACHE_INMUTABLE_NAME = 'inmutable-v1';

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
                    './js/app.js'
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
        const respuestaCache = caches.match(e.request)
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
                                limpiarCache(CACHE_DYNAMIC_NAME, 50);
                            });
                        return newRes.clone();
                    });
            });

        e.respondWith(respuestaCache);
    });    
    ```

### 64. Estrategia: Network with cache fallback
1. Modificar **04-cache-offline\sw.js**:
    ```js
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
                    './js/app.js'
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
        const respuestaNetwork = fetch(e.request)
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
        e.respondWith(respuestaNetwork);
    });    
    ```

### 65. Estrategia: Cache with network update
1. Modificar **04-cache-offline\sw.js**:
    ```js
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
                    './js/app.js'
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
        if (e.request.url.includes('bootstrap')) {
            return e.respondWith(caches.match(e.request));
        }
        const respuestaNetworkRace = caches.open(CACHE_STATIC_NAME)
            .then(cache => {
                fetch(e.request)
                    .then(newRes => cache.put(e.request, newRes));
                return cache.match(e.request);
            });

        e.respondWith(respuestaNetworkRace);
    });    
    ```
2. Modificar **04-cache-offline\index.html**:
    ```html
    <!DOCTYPE html>
    <html lang="extends">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Mi PWA</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" >
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body class="container p-3">
        <img src="img/main.jpg" alt="Vías del tren" class="img-fluid">
        <h1>Bienvenido!</h1>
        <hr>

        <p>Las PWAs son el siguiente paso a las página</p>
        <p>Cargan sumamente rápido y no necesitan conexión a internet para trabajar</p>

        <script src="js/app.js"></script>
    </body>
    </html>    
    ```

### 66. Estrategia: Cache y Network Race
1. Modificar **04-cache-offline\sw.js**:
    ```js
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
    ```

### 67. Navegación offline con página personalizada de error
+ **[05-navegacion-offline.zip](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion06/05-navegacion-offline.zip)**.
1. Crear **05-navegacion-offline\css\style.css**:
    ```css
    html, body {
        height: 100%;
        background-color: #1D2125;
    }

    h1,h2,h3,h4,h5 {
        color: white;
    }

    hr {
        background-color: white;
    }

    p{
        color: #D1D1D1;
    }    
    ```
2. Crear **05-navegacion-offline\js\app.js**:
    ```js
    if ( navigator.serviceWorker ) {
        navigator.serviceWorker.register('./sw.js');
    }

    // if ( window.caches ) {
    //     // caches.open('prueba-1');
    //     caches.open('prueba-2');
    //     // caches.has('prueba-2').then( console.log );
    //     caches.delete('prueba-1').then( console.log );
    //     caches.open('cache-v1.1').then( cache => {
    //         // cache.add('/index.html');
    //         cache.addAll([
    //             '/index.html',
    //             '/css/style.css',
    //             '/img/main.jpg'
    //         ]).then( () => {
    //             // cache.delete('/css/style.css');
    //             cache.put( 'index.html', new Response('Hola Mundo') );
    //         });
    //         // cache.match('/index.html')
    //         //         .then( res => {
    //         //             res.text().then( console.log );
    //         //         });
    //     });
    //     caches.keys().then( keys => {
    //         console.log(keys);
    //     });
    // };    
    ```
3. Crear **05-navegacion-offline\index.html**:
    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Mi PWA</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body class="container p-3">
        <img src="img/main.jpg" alt="Vías del tren" class="img-fluid">
        <!-- <img src="https://images.pexels.com/photos/371633/pexels-photo-371633.jpeg?auto=compress&cs=tinysrgb&h=350" alt="Vías del tren" class="img-fluid"> -->
        <!-- <img src="https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&h=350" alt="Vías del tren" class="img-fluid"> -->
        <!-- <img src="https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2018/06/ultra-wide-mistakes-lead-image.jpg" alt="Vías del tren" class="img-fluid"> -->
        <!-- <img src="https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&h=350" alt="Vías del tren" class="img-fluid"> -->
        <!-- <img src="https://www.usnews.com/dims4/USNEWS/2ffb4ff/2147483647/resize/1200x%3E/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2F33%2Fdc%2Fc70106214b8c9fd1df474942fafc%2F18-milford-sound-fjords-national-park.jpg" alt="Vías del tren" class="img-fluid"> -->
        <!-- <img src="http://www.spanishandsurf.net/wordpress/wp-content/uploads/Paisaje_25-520x265.jpg" alt="Vías del tren" class="img-fluid"> -->
        <!-- <img src="https://iso.500px.com/wp-content/uploads/2018/02/500px_blog_landscape_photography_quest-1500x1000.jpg" alt="Vías del tren" class="img-fluid"> -->
        <!-- <img src="https://media.istockphoto.com/photos/alberta-wilderness-near-banff-picture-id583809524?k=6&m=583809524&s=612x612&w=0&h=BULe3Nu75PMVOVMctj6jIM6Wmb9tivpwvVsu6sOpo9A=" alt="Vías del tren" class="img-fluid"> -->
        
        <h1>Bienvenido</h1>
        <hr>

        <p> Las PWAs son el siguiente paso a las páginas y aplicaciones web.</p>
        <p>Cargan sumamente rápido y no necesitan conexión a internet para trabajar</p>

        <a href="pages/page2.html" class="btn btn-primary btn-block">Página 2</a>

        <script src="js/app.js"></script>
    </body>
    </html>    
    ```
4. Crear **05-navegacion-offline\pages\offline.html**:
    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Mi PWA</title>
    </head>
    <body class="container p-3">
        <h1>Offline File</h1>
        <hr>
    </body>
    </html>    
    ```
6. Crear **05-navegacion-offline\pages\page2.html**:
    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Mi PWA</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
        <link rel="stylesheet" href="../css/style.css">
    </head>
    <body class="container p-3">
        <img src="../img/main-patas-arriba.jpg" alt="Vías del tren" class="img-fluid">

        <h1>Página 2</h1>
        <hr>
        <a href="../" class="btn btn-primary btn-block">Home</a>

        <script src="../js/app.js"></script>
    </body>
    </html>    
    ```
7. Crear **05-navegacion-offline\sw.js**:
    ```js
    // const CACHE_NAME = 'cache-1';
    const CACHE_STATIC_NAME  = 'static-v1';
    const CACHE_DYNAMIC_NAME = 'dynamic-v1';
    const CACHE_INMUTABLE_NAME = 'inmutable-v1';
    const CACHE_DYNAMIC_LIMIT = 50;

    function limpiarCache(cacheName, numeroItems) {
        caches.open(cacheName)
            .then(cache => {
                return cache.keys()
                    .then(keys => {
                        
                        if (keys.length > numeroItems) {
                            cache.delete( keys[0] )
                                .then( limpiarCache(cacheName, numeroItems));
                        }
                    });       
            });
    }

    self.addEventListener('install', e => {
        const cacheProm = caches.open( CACHE_STATIC_NAME )
            .then( cache => {
                return cache.addAll([
                    './',
                    './index.html',
                    './css/style.css',
                    './img/main.jpg',
                    './js/app.js',
                    './img/no-img.jpg',
                    './pages/offline.html'
                ]); 
            });
        const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME)
                .then(cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'));
        e.waitUntil(Promise.all([cacheProm, cacheInmutable]) );
    });

    self.addEventListener('fetch', e => {

        // 2- Cache with Network Fallback
        const respuesta = caches.match(e.request)
            .then(res => {
                if (res) return res;
                // No existe el archivo, tengo que ir a la web
                return fetch(e.request).then(newResp => {
                    caches.open(CACHE_DYNAMIC_NAME)
                        .then(cache => {
                            cache.put(e.request, newResp);
                            limpiarCache(CACHE_DYNAMIC_NAME, 50);
                        });
                    return newResp.clone();
                });
            });

        e.respondWith(respuesta);
    });
    ```

### 68. Mostrar la página offline si no existe la petición en cache
1. Modificar **05-navegacion-offline\sw.js**:
    ```js
    // const CACHE_NAME = 'cache-1';
    const CACHE_STATIC_NAME  = 'static-v2';
    const CACHE_DYNAMIC_NAME = 'dynamic-v1';
    const CACHE_INMUTABLE_NAME = 'inmutable-v1';
    const CACHE_DYNAMIC_LIMIT = 50;

    function limpiarCache(cacheName, numeroItems) {
        caches.open(cacheName)
            .then(cache => {
                return cache.keys()
                    .then(keys => {
                        
                        if (keys.length > numeroItems) {
                            cache.delete( keys[0] )
                                .then( limpiarCache(cacheName, numeroItems));
                        }
                    });       
            });
    }

    self.addEventListener('install', e => {
        const cacheProm = caches.open( CACHE_STATIC_NAME )
            .then( cache => {
                return cache.addAll([
                    './',
                    './index.html',
                    './css/style.css',
                    './img/main.jpg',
                    './js/app.js',
                    './img/no-img.jpg',
                    './pages/offline.html'
                ]); 
            });
        const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME)
                .then(cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'));
        e.waitUntil(Promise.all([cacheProm, cacheInmutable]) );
    });

    self.addEventListener('fetch', e => {

        // 2- Cache with Network Fallback
        const respuesta = caches.match(e.request)
            .then(res => {
                if (res) return res;
                // No existe el archivo, tengo que ir a la web
                return fetch(e.request).then(newResp => {
                    caches.open(CACHE_DYNAMIC_NAME)
                        .then(cache => {
                            cache.put(e.request, newResp);
                            limpiarCache(CACHE_DYNAMIC_NAME, 50);
                        });
                    return newResp.clone();
                });
            })
            .catch(err => {
                if (e.request.headers.get('accept').includes('text/html')) {
                    return caches.match('./pages/offline.html');
                }
            });

        e.respondWith(respuesta);
    });
    ```
2. Modificar **05-navegacion-offline\pages\offline.html**:
    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Mi PWA</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
        <link rel="stylesheet" href="../css/style.css">
    </head>
    <body class="container p-3">
        <h1>Offline File</h1>
        <hr>

        <p>Sin conexión a internet</p>
    </body>
    </html>    
    ```

### 69. Borrando versiones viejas del cache
1. Modificar **05-navegacion-offline\sw.js**:
    ```js
    // const CACHE_NAME = 'cache-1';
    const CACHE_STATIC_NAME  = 'static-v3';
    const CACHE_DYNAMIC_NAME = 'dynamic-v1';
    const CACHE_INMUTABLE_NAME = 'inmutable-v1';
    const CACHE_DYNAMIC_LIMIT = 50;

    function limpiarCache(cacheName, numeroItems) {
        caches.open(cacheName)
            .then(cache => {
                return cache.keys()
                    .then(keys => {
                        
                        if (keys.length > numeroItems) {
                            cache.delete( keys[0] )
                                .then( limpiarCache(cacheName, numeroItems));
                        }
                    });       
            });
    }

    self.addEventListener('install', e => {
        const cacheProm = caches.open( CACHE_STATIC_NAME )
            .then( cache => {
                return cache.addAll([
                    './',
                    './index.html',
                    './css/style.css',
                    './img/main.jpg',
                    './js/app.js',
                    './img/no-img.jpg',
                    './pages/offline.html'
                ]); 
            });
        const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME)
                .then(cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'));
        e.waitUntil(Promise.all([cacheProm, cacheInmutable]) );
    });

    self.addEventListener('activate', e => {
        const limpieza = caches.keys().then(keys => {
            keys.forEach(key => {
                if (key !== CACHE_STATIC_NAME && key.includes('static')) {
                //if (key !== CACHE_STATIC_NAME || key !== CACHE_DYNAMIC_NAME || key !== CACHE_INMUTABLE_NAME) {
                    return caches.delete(key);
                }
            });
        });

        e.waitUntil(limpieza);
    })

    self.addEventListener('fetch', e => {

        // 2- Cache with Network Fallback
        const respuesta = caches.match(e.request)
            .then(res => {
                if (res) return res;
                // No existe el archivo, tengo que ir a la web
                return fetch(e.request).then(newResp => {
                    caches.open(CACHE_DYNAMIC_NAME)
                        .then(cache => {
                            cache.put(e.request, newResp);
                            limpiarCache(CACHE_DYNAMIC_NAME, 50);
                        });
                    return newResp.clone();
                });
            })
            .catch(err => {
                if (e.request.headers.get('accept').includes('text/html')) {
                    return caches.match('./pages/offline.html');
                }
            });

        e.respondWith(respuesta);
    });
    ```

### Cuestionario 3: Examen sobre el cache
+ Pregunta 1: Cuando creamos el cache dinámico, ¿El navegador web administra dinámicamente para que no pase de los 50 items de forma automática?
    **Respuesta**: Falso.
+ Pregunta 2: ¿Qué hace esta instrucción?
    ```js
    caches.keys()
    ```
    **Respuesta**: Es una promesa que retorna todos los nombres de los caches que están registrados.
+ Pregunta 3: ¿Qué argumentos recibe el **cache.put(Argumento 1, Argumento 2)**?
    **Respuesta**: Request y la respuesta a ese request.
+ Pregunta 4: La principal razón para que el **fetch(e.request)** falle y se dispare el error.
    **Respuesta**: Fallo por conexión a internet.
+ Pregunta 5: ¿Qué estrategia es esta?
    ```js
    e.respondWith(caches.match(e.request));
    ```
    **Respuesta**: Cache Only.
+ Pregunta 6: ¿Qué estrategia es esta?
    ```js
    const respuesta = caches.match(e.request)
        .then(res => {
            if (res) return res;
            return fetch(e.request ).then(newResp => {
                caches.open(CACHE_DYNAMIC_NAME)
                    .then( cache => {
                        cache.put(e.request, newResp);
                        limpiarCache(CACHE_DYNAMIC_NAME, 50);
                    });
                return newResp.clone();
            });
        });
    
        e.respondWith(respuesta);
    ```
    **Respuesta**: Cache first with network fallback.
+ Pregunta 7: ¿Todas las estrategias del cache, permiten conexión offline?
    **Respuesta**: Verdadero.
+ Pregunta 8: ¿Cuáles son las desventajas del Network with cache fallback?
    **Respuesta**: Siempre consumirá internte aunque exista en cache y puede ser lenta debido a la conexión a internet.
+ Pregunta 9: Durante esta instalación, si la imagen **no-img.jpg** no existiera, ¿Qué pasaría?
    ```js
    cache.addAll([
        './',
        './index.html',
        './css/style.css',
        './img/main.jpg',
        './js/app.js',
        './img/no-img.jpg'
    ]);
    ```
    **Respuesta**: La instalación del nuevo SW es abortada.
+ Pregunta 10: ¿Cúal es la idea de tener versionamiento en nuestros caches?
    **Respuesta**: Que el nuevo cache no colisione o se mezcle con el viejo cache.

### 70. Código fuente de la sección
+ **[Código fuente](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion06/05-navegacion-offline-final.zip)**.

### 71. Documentaciones adicionales
+ **[David Walsh - Cache](https://davidwalsh.name/cache)**.
+ **[Google Developers - Cache API](https://web.dev/cache-api-quick-guide)**.


## Sección 7: Despliegue a dispositivos
### 72. Introducción a la sección
+ Introducción a la instalación de PWA en dispositivos.

### 73. Temas puntuales de la sección
+ Esta sección está enfocada en probar nuestra aplicación en un dispositivo y verlo funcionando en el mismo.
+ Es recomendable trabajar con android ya que es el sistema operativo que mejor implementa las PWAs hasta el momento, pero también aprenderemos unos tips que servirán para mejorar el aspecto visual de nuestra aplicación en IOS.
+ El corazón de esta sección es el archivo **manifest.json**, quien nos ayuda a indicarle al sistema operativo cómo debe de lucir nuestra aplicación, pero también aprenderemos un par de atributos meta y técnicas para que se vea aún mejor la aplicación web

### 74. Inicio del proyecto - Twittor
+ **[06-twittor.zip](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion07/06-twittor.zip)**.
+ **[Twitter Client UI in CSS + HTML](https://codepen.io/marceloag/pen/AevNyO)**.
+ **[Animate.css](https://animate.style/)**.
1. Descomprimir **[06-twittor.zip](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion07/06-twittor.zip)** en **06-twittor** y levantar servidor con:
    + $ http-server -o -p 8082
    + Cambiar luego la dercción de **http://127.0.0.1:8082** a **http://localhost:8082**.
2. Modificar **06-twittor\README.md**:
    ```md
    # Chat Soluciones++
    Un cascarón de chat usando jQuery para PWAs    
    ```

### 75. Repaso: Configurar SW
+ [activate-borrar-cache-viejo.txt](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion07/activate-borrar-cache-viejo.txt).
1. Modificar **06-twittor\js\app.js**:
    ```js
    // Registro del SW
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('./sw.js');
    }

    // Referencias de jQuery
    var titulo      = $('#titulo');
    var nuevoBtn    = $('#nuevo-btn');
    var salirBtn    = $('#salir-btn');
    var cancelarBtn = $('#cancel-btn');
    var postBtn     = $('#post-btn');
    var avatarSel   = $('#seleccion');
    var timeline    = $('#timeline');

    var modal       = $('#modal');
    var modalAvatar = $('#modal-avatar');
    var avatarBtns  = $('.seleccion-avatar');
    var txtMensaje  = $('#txtMensaje');

    // El usuario, contiene el ID del héroe seleccionado
    var usuario;

    // ===== Codigo de la aplicación
    function crearMensajeHTML(mensaje, personaje) {
        var content =`
            <li class="animated fadeIn fast">
                <div class="avatar">
                    <img src="img/avatars/${ personaje }.jpg">
                </div>
                <div class="bubble-container">
                    <div class="bubble">
                        <h3>@${ personaje }</h3>
                        <br/>
                        ${ mensaje }
                    </div>
                    
                    <div class="arrow"></div>
                </div>
            </li>
        `;

        timeline.prepend(content);
        cancelarBtn.click();
    }

    // Globals
    function logIn( ingreso ) {
        if ( ingreso ) {
            nuevoBtn.removeClass('oculto');
            salirBtn.removeClass('oculto');
            timeline.removeClass('oculto');
            avatarSel.addClass('oculto');
            modalAvatar.attr('src', 'img/avatars/' + usuario + '.jpg');
        } else {
            nuevoBtn.addClass('oculto');
            salirBtn.addClass('oculto');
            timeline.addClass('oculto');
            avatarSel.removeClass('oculto');
            titulo.text('Seleccione Personaje');
        }
    }

    // Seleccion de personaje
    avatarBtns.on('click', function() {
        usuario = $(this).data('user');
        titulo.text('@' + usuario);
        logIn(true);
    });

    // Boton de salir
    salirBtn.on('click', function() {
        logIn(false);
    });

    // Boton de nuevo mensaje
    nuevoBtn.on('click', function() {
        modal.removeClass('oculto');
        modal.animate({ 
            marginTop: '-=1000px',
            opacity: 1
        }, 200 );
    });

    // Boton de cancelar mensaje
    cancelarBtn.on('click', function() {
        modal.animate({ 
            marginTop: '+=1000px',
            opacity: 0
        }, 200, function() {
            modal.addClass('oculto');
            txtMensaje.val('');
        });
    });

    // Boton de enviar mensaje
    postBtn.on('click', function() {
        var mensaje = txtMensaje.val();
        if ( mensaje.length === 0 ) {
            cancelarBtn.click();
            return;
        }

        crearMensajeHTML( mensaje, usuario );
    });    
    ```
2. Crear **06-twittor\sw.js**:
    ```js
    const STATIC_CACHE      = 'static-v1';
    const DYNAMIC_CACHE     = 'dynamic-v1';
    const INMUTABLE_CACHE   = 'inmutable-v1';

    const APP_SHELL = [
        './',
        './index.html',
        './css/style.css',
        './img/favicon.ico',
        './img/avatars/spiderman.jpg',
        './img/avatars/ironman.jpg',
        './img/avatars/wolverine.jpg',
        './img/avatars/thor.jpg',
        './img/avatars/hulk.jpg',
        './js/app.js'
    ];

    const APP_SHELL_INMUTABLE = [
        'https://fonts.googleapis.com/css?family=Quicksand:300,400',
        'https://fonts.googleapis.com/css?family=Lato:400,300',
        /* 'https://use.fontawesome.com/releases/v5.3.1/css/all.css', */
        './css/animate.css',
        './js/libs/jquery.js'
    ];

    // Creación de los caches
    self.addEventListener('install', e => {
        const cacheStatic = caches.open(STATIC_CACHE).then(cache => cache.addAll(APP_SHELL));
        const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => cache.addAll(APP_SHELL_INMUTABLE));

        e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
    });

    // Limpieza de cache superados
    self.addEventListener('activate', e => {
        const limpieza = caches.keys().then(keys => {
            keys.forEach(key => {
                if (key !== STATIC_CACHE && key.includes('static')) {
                //if (key !== CACHE_STATIC_NAME || key !== CACHE_DYNAMIC_NAME || key !== CACHE_INMUTABLE_NAME) {
                    return caches.delete(key);
                }
            });
        });

        e.waitUntil(limpieza);
    });    
    ```
3. Modificar **06-twittor\index.html**:
    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Twittor</title>

        <link href='https://fonts.googleapis.com/css?family=Quicksand:300,400' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css">

        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/animate.css">

        <link rel="shortcut icon" type="image/ico" href="img/favicon.ico"/>
    </head>
    <body>
            <!-- Titulo -->
            <span class="first"> 
                <span id="salir-btn" class="fa fa-sign-out-alt out oculto animated fadeIn"></span>
                <span id="titulo">
                    <i class="fa fa-user"></i>
                    Seleccione Personaje
                </span>
                <span id="nuevo-btn" class="fa fa-pen-square new oculto animated fadeIn fast"></span>
            </span>
            <!-- Fin Titulo -->

            <!-- Modal -->
            <div id="modal" class="oculto">
                <img id="modal-avatar" src="img/avatars/spiderman.jpg">

                <span class="first"> 
                    <span id="titulo-modal">Nuevo mensaje</span>
                    <span id="cancel-btn" class="fa fa-times"></span>
                </span>
                
                <div class="nuevo-mensaje">
                    <textarea id="txtMensaje" placeholder="Nuevo mensaje..." rows="5"></textarea>
                </div>

                <!-- boton de enviar -->
                <div id="post-btn" class="fab">
                    <i class="fa fa-paper-plane"></i>
                </div>

                <div id="post-btn" class="fab-marker">
                    <i class="fa fa-map-marker-alt"></i>
                </div>

                <div id="post-btn" class="fab-photo">
                    <i class="fa fa-image"></i>
                </div>
            </div>
            <!-- Fin Modal -->

            <!-- Seleccion de personaje -->
            <div id="seleccion" class="seleccion animated fadeIn fast" align="center">    
                <div>
                    <img data-user="spiderman" src="img/avatars/spiderman.jpg" alt="spiderman" class="seleccion-avatar">
                </div>
                <div>
                    <img data-user="ironman" src="img/avatars/ironman.jpg" alt="ironman" class="seleccion-avatar">
                </div>
                <div>
                    <img data-user="wolverine" src="img/avatars/wolverine.jpg" alt="wolverine" class="seleccion-avatar">
                </div>
                <div>
                    <img data-user="thor" src="img/avatars/thor.jpg" alt="thor" class="seleccion-avatar">
                </div>
                <div>
                    <img data-user="hulk" src="img/avatars/hulk.jpg" alt="hulk" class="seleccion-avatar">
                </div>
            </div>
            <!-- FIN Seleccion de personaje -->

            <!-- Lista de mensajes -->
            <ul id="timeline" class="timeline oculto">   
                <!-- Mensaje -->
                <li class="animated fadeIn fast">
                    <div class="avatar">
                        <img src="img/avatars/spiderman.jpg">
                    </div>
                    <div class="bubble-container">
                        <div class="bubble">
                            <h3>@spiderman</h3>
                            <br/>
                            La tía May, hizo unos panqueques en forma de ironman!
                        </div>        
                        <div class="arrow"></div>
                    </div>
                </li>
                <!-- Fin del mensaje -->
            </ul>
            <!-- Fin Lista de mensajes -->

            <script src="js/libs/jquery.js"></script>
            <script src="js/app.js"></script>
    </body>
    </html>    
    ```

### 76. Repaso: Cache con Network Fallback
1. Crear **06-twittor\js\sw-utils.js**:
    ```js
    function actualizaCacheDinamico(dynamicCache, req, res) {
        if(res.ok) {
            return caches.open(dynamicCache).then(caches => {
                caches.put(req, res.clone());
                return res.clone();
            });
        } else {
            return res;
        }
    }    
    ```
2. Modificar **06-twittor\sw.js**:
    ```js
    importScripts('js/sw-utils.js');

    const STATIC_CACHE      = 'static-v2';
    const DYNAMIC_CACHE     = 'dynamic-v1';
    const INMUTABLE_CACHE   = 'inmutable-v1';

    const APP_SHELL = [
        './',
        './index.html',
        './css/style.css',
        './img/favicon.ico',
        './img/avatars/spiderman.jpg',
        './img/avatars/ironman.jpg',
        './img/avatars/wolverine.jpg',
        './img/avatars/thor.jpg',
        './img/avatars/hulk.jpg',
        './js/app.js'
    ];

    const APP_SHELL_INMUTABLE = [
        'https://fonts.googleapis.com/css?family=Quicksand:300,400',
        'https://fonts.googleapis.com/css?family=Lato:400,300',
        /* 'https://use.fontawesome.com/releases/v5.3.1/css/all.css', */
        './css/animate.css',
        './js/libs/jquery.js'
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
    ```
3. Modificar **06-twittor\\.jshintrc**:
    ```jshintrc
    // ...
    "globals"       : {
        // ...
        "importScripts" : true
    }
    // ...   
    ```

### 77. El archivo Manifest.json
+ **[Cómo agregar un manifiesto en la aplicación web](https://web.dev/add-manifest)**.
+ **[material+de+clase+-+Manifest.zip](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion07/material+de+clase+-+Manifest.zip)**.
+ **[El+manifiesto+Google+Developer.pdf](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion07/El+manifiesto+Google+Developer.pdf)**.
+ Extensión de VSC recomendada: 
    + PWA Tools
        + John Papa
        + PWA Tools
1. Crear archivo de manifiesto **06-twittor\manifest.json**:
    ```json
    {
        "short_name": "Twittor",
        "name": "Programa de prueba para PWA",
        "start_url": "index.html",
        "background_color": "#3498db",
        "display": "standalone",
        "orientation": "portrait",
        "theme_color": "#3498db",
        "icons": [
            {
                "src": "img/icons/icon-72x72.png",
                "type": "image/png",
                "sizes": "72x72"
            },
            {
                "src": "img/icons/icon-96x96.png",
                "type": "image/png",
                "sizes": "96x96"
            },
            {
                "src": "img/icons/icon-128x128.png",
                "type": "image/png",
                "sizes": "128x128"
            },
            {
                "src": "img/icons/icon-144x144.png",
                "type": "image/png",
                "sizes": "144x144"
            },
            {
                "src": "img/icons/icon-152x152.png",
                "type": "image/png",
                "sizes": "152x152"
            },
            {
                "src": "img/icons/icon-192x192.png",
                "type": "image/png",
                "sizes": "192x192"
            },
            {
                "src": "img/icons/icon-384x384.png",
                "type": "image/png",
                "sizes": "384x384"
            },
            {
                "src": "img/icons/icon-512x512.png",
                "type": "image/png",
                "sizes": "512x512"
            }
        ]
    }    
    ```
2. Modificar **06-twittor\index.html**:
    ```html
    <!-- ... -->
    <head>
        <!-- ... -->
        <!-- Manifest -->
        <link rel="manifest" href="manifest.json">
        <!-- Android -->
        <meta name="theme-color" content="#3498db">
    </head>
    <!-- ... -->
    ```

### 78. Depurar y correr en un dispositivo real
+ Sobre como correr nuestra aplicación en desarrollo en un dispositivo móvil.

### 79. Desplegar aplicación en GitHub Pages
+ **[Git](https://git-scm.com)**.
+ **[GitHub](https://github.com)**.
1. Modificar **06-twittor\js\app.js**:
    ```js
    let url = window.location.href;
    let swLocation = '/twittor/sw.js';

    // Registro del SW
    if (navigator.serviceWorker) {
        if(url.includes('localhost')){   
            swLocation = './sw.js';
        }
        navigator.serviceWorker.register(swLocation);
        //navigator.serviceWorker.register('./sw.js');
    }
    // ...    
    ```
    ::: warning Advertencia
    Creo que este cambio ya no es necesario, por lo que no se tomará en cuenta.
    :::
2. Modificar **06-twittor\sw.js**:
    ```js
    const APP_SHELL = [
        //'./',
        './index.html',
        './css/style.css',
        './img/favicon.ico',
        './img/avatars/spiderman.jpg',
        './img/avatars/ironman.jpg',
        './img/avatars/wolverine.jpg',
        './img/avatars/thor.jpg',
        './img/avatars/hulk.jpg',
        './js/app.js'
    ];    
    ```
    ::: warning Advertencia
    Creo que este cambio ya no es necesario, por lo que no se tomará en cuenta.
    :::
3. Crear proyecto en la página de [GitHub](https://github.com) con el nombre: **twittor**.
    + **Description**: Aplicación de PWA curso de Fernando Herrera.
    + **Public**.
4. En la ubicación raíz del proyecto en la terminal de la máquina local:
    + $ git init
    + $ git add .
    + $ git commit -m "Primer commit"
    + $ git branch -M main
    + $ git remote add origin https://github.com/petrix12/twittor.git
    + $ git push -u origin main
5. Para utilizar GitHub como hosting de nuestro proyecto:
    + Ir al proyecto **twittor** en GitHub.
    + Clic en **Sttings**.
    + En el panel izquierdo clic en **Pages**.
        + Source: Deploy for branch
        + Branch: main
        + Clic en **Save**
    + Obtener el enlace de la página: https://petrix12.github.io/twittor
        ::: wargning Advertencia
        Quizas sea necesario esperar entre 2 y 5 minutos para que la página se genere, y probablemente se tambión necesario refrescar la página.
        :::

### 80. Instalando nuestra PWA en el dispositivo móvil - Android
+ Sobre como instalar nuestra aplicación en Android.

### 81. Mejorando la apariencia en IOS
+ **[Guía de estilos iOS](https://medium.com/appscope/designing-native-like-progressive-web-apps-for-ios-1b3cdda1d0e8)**.
+ **[Guia+de+estilos+ios.pdf](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion07/Guia+de+estilos+ios.pdf)**.
1. Modificar **06-twittor\index.html**:
    ```html
    <!-- ... -->
    <head>
        <!-- ... -->
        <!-- iOS -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <link rel="apple-touch-icon" href="img/icons/icon-192x192.png">
        <link rel="apple-touch-icon" sizes="152x152" href="img/icons/icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="img/icons/icon-192x192.png">
        <link rel="apple-touch-icon" sizes="167x167" href="img/icons/icon-152x152.png">
        <!-- iPhone X (1125px x 2436px) -->
        <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="img/icons-ios/apple-launch-1125x2436.png">
        <!-- iPhone 8, 7, 6s, 6 (750px x 1334px) -->
        <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href="img/icons-ios/apple-launch-750x1334.png">
        <!-- iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px) -->
        <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" href="img/icons-ios/apple-launch-1242x2208.png">
        <!-- iPhone 5 (640px x 1136px) -->
        <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" href="img/icons-ios/apple-launch-640x1136.png">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="apple-mobile-web-app-title" content="Twittor!">
    </head>
    <!-- ... -->    
    ```
2. Modificar **06-twittor\css\style.css**:
    ```css
    /* ... */
    html, body {
        /* ... */
        overscroll-behavior-y: contanin;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
    }    
    /* ... */
    ```
    ::: warning Advertencia
    Lo importante es que los nuevos estilos se encuentre en el **body**.
    :::
3. Modificar **06-twittor\sw.js**:
    ```js
    // ...
    const STATIC_CACHE      = 'static-v3';
    // ...
    ```

### 82. Removiendo el Notch de los iPhones
1. Modificar **06-twittor\index.html**:
    ```html
    <!-- ... -->
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, height=device-height, viewport-fit=cover">
        <!-- ... -->
    </head>
    <!-- ... -->   
    ```
2. Modificar **06-twittor\sw.js**:
    ```js
    // ...
    const STATIC_CACHE      = 'static-v4';
    const DYNAMIC_CACHE     = 'dynamic-v2';
    // ...
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
    // ...
    ```

### 83. Notas de Android
+ Sobre la importancia de incorporar los cambios del apartado anterior.

### 84. Audits - Lighthouse
::: tip Notas
+ En las herramientas de desarrollo de Google Chrome, se encuentra el menú **Audits** o **Lighthouse** para ayudarnos a evaluar que tan bien esta nuestra PWA.
+ Al probar esta herramienta podemos deseleccionar **SEO** y aspirar a estar sobre un 70% en cada uno de los items.
+ Al finalizar de probar la aplicación es recomendable limpiar el cache, ya que esta herramienta genera mucha basura (Creo que este problema ya lo solventó Google).
:::

### 85. Generadores automáticos del Manifes.json
+ Hay muchos generadores automáticos del archivo manifest.json, aquí se muestran dos, que el autor del curso considera muy buenas, algunos hasta generan todos los íconos que necesitamos para la aplicación.
    + https://app-manifest.firebaseapp.com     (**recomendado**)
    + https://tomitm.github.io/appmanifest

### 86. Código fuente de la sección
+ **Código fuente**:
    + [Respositorio GitHub](https://github.com/Klerith/twittor).
    + [twittor-master.zip](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion07/twittor-master.zip).


## Sección 8: IndexedDB - Reforzamiento de base de datos local
### 87. Introducción a la sección
+ Sobre el uso de IndexedDB.

### 88. Temas puntuales de la sección
+ Esta sección está enfocada en aprender cómo grabar data en una base de datos local que funcione sin conexión a internet.
+ La idea central, es poder realizar grabaciones locales sin conexión a internet, para que cuando recuperemos la comunicación con el servidor, realizar una sincronización  de los registros almacenados localmente.
+ ¿Suena demasiado bien? pues es posible hacerlo, lamentablemente para trabajar con esto ocupamos algo llamado indexeddb, el cual es algo complicado y poco amigable, pero aquí lo aprenderemos de igual forma, y también nos enfocaremos en utilizar una alternativa fácil de usar que nos resolverá el mismo problema.

### 89. Inicios en indexedDB
+ **[07-indexeddb.zip](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion08/07-indexeddb.zip)**.
+ **[IndexedDB](https://developer.mozilla.org/es/docs/Web/API/IndexedDB_API)**.
1. Crear **07-indexeddb\index.html**:
    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Reforzamiento sobre indexeddb</title>
    </head>
    <body>
        <script src="./app.js"></script>
    </body>
    </html>    
    ```
2. Crear **07-indexeddb\app.js**:
    ```js
    // indexedDB: Reforzamiento
    // Creación de la base de datos mi-database
    let request = window.indexedDB.open('mi-database', 1);

    // Se actualiza cuando se crea o se sube de versión de la DB.
    request.onupgradeneeded = event => {
        console.log('Actualización de DB');

        let db = event.target.result;
        db.createObjectStore('heroes', {
            keyPath: 'id'
        });
    };    
    ```

### 90. Manejo de errores e inserción de registros
1. Modificar **07-indexeddb\app.js**:
    ```js
    // indexedDB: Reforzamiento
    // Creación de la base de datos mi-database
    let request = window.indexedDB.open('mi-database', 1);

    // Actualización: Se actualiza cuando se crea o se sube de versión de la DB.
    request.onupgradeneeded = event => {
        console.log('Actualización de DB');

        let db = event.target.result;

        // Creando tabla heroes
        db.createObjectStore('heroes', {
            keyPath: 'id'
        });
    };

    // Manejo de errores
    request.onerror = event => {
        console.log('DB error:', event.target.error);
    };

    // Insertar datos
    request.onsuccess = event => {
        let db = event.target.result;
        let heroesData = [
            { id: '1111', heroe: 'Spiderman', mensaje: 'Aquí su amigo Spiderman' },
            { id: '2222', heroe: 'Ironman', mensaje: 'Aquí su amigo Ironman' },
        ];

        let heroesTransaction = db.transaction('heroes', 'readwrite');

        // En caso de error
        heroesTransaction.onerror = event => {
            console.log('Error en guardar:', event.target.error);
        }

        // En caso de exito en la transacción
        heroesTransaction.oncomplete = event => {
            console.log('Exito en guardar:', event);
        }

        // Lugar de almacenamiento
        let heroesStore = heroesTransaction.objectStore('heroes');

        // Insertar registros
        for (let heroe of heroesData) {
            heroesStore.add(heroe);
        }

        // Si la inserción es exitosa
        heroesStore.onsuccess = event => {
            console.log('Nuevos registros agregados a la DB');
        };
    };
    ```
    ::: warning Advertencia
    Existen librerias que permiten manejar muy facilmente el **indexedDB**.
    :::

### 91. Código fuente del indexedDB
+ **[07-indexeddb_v0.zip](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion08/07-indexeddb_v0.zip)**.

### 92. PouchDB - Empezando
+ **[Getting Started Guide](https://pouchdb.com/getting-started.html)**.
+ **[pouchdb-getting-started-todo.zip](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion08/pouchdb-getting-started-todo.zip)**.
+ **[Getting+Started+Guide.pdf](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion08/Getting+Started+Guide.pdf)**.
1. Descargar [pouchdb](https://github.com/pouchdb/pouchdb-getting-started-todo/archive/master.zip).
2. Descomprimir y renombrar carpeta a **08-pouchdb-todo**.
3. Modificar **08-pouchdb-todo\index.html**:
    ```html{4}
    <!-- ... -->
    <body>
        <!-- ... -->
        <script src="https://cdn.jsdelivr.net/npm/pouchdb@7.3.1/dist/pouchdb.min.js"></script>
        <script src="https://login.persona.org/include.js"></script>
        <script src="js/pouchdb-nightly.js"></script>
        <script src="js/base.js"></script>
        <script src="js/app.js"></script>
    </body>
    <!-- ... -->
    ```
    ::: tip Nota
    Para la configuración inicial de este proyecto nos guiaremos por https://pouchdb.com/getting-started.html
    :::
4. Modificar **08-pouchdb-todo\js\app.js**:
    ```js{4,10-17}
    // ...
    // EDITING STARTS HERE (you dont need to edit anything above this line)

	var db = new PouchDB('todos');
	var remoteCouch = false;
	var cookie;
    // ...
	// We have to create a new todo document and enter it in the database
	function addTodo(text) {
		var todo = {
			_id: new Date().toISOString(),
			title: text,
			completed: false
		};	
        db.put(todo)
            .then(console.log('Successfully posted a todo!'))
            .catch(console.log);
	}
    // ...    
    ```

### 93. Leer registros de la base de datos
1. Modificar **08-pouchdb-todo\js\app.js**:
    ```js
    // ...
	var remoteCouch = false;

	db.changes({
		since: 'now',
		live: true
	}).on('change', showTodos);    
    // ...
    // Show the current list of todos by reading them from the database
	function showTodos() {
		db.allDocs({include_docs: true, descending: true})
			.then(doc => {
				redrawTodosUI(doc.rows);
			})
	}
    // ...    
    ```

### 94. Editar y Borrar TODOS
1. Modificar **08-pouchdb-todo\js\app.js**:
    ```js
    // ...
	// We have to create a new todo document and enter it in the database
	function addTodo(text) {
		if (trimmedText.length === 0) return;
		var todo = {
			_id: new Date().toISOString(),
			title: text,
			completed: false
		};
        db.put(todo)
            .then(console.log('Successfully posted a todo!'))
            .catch(console.log);	
	}    
    // ...
	function checkboxChanged(todo, event) {
		todo.completed = event.target.checked;
		db.put(todo);   //.then(console.log('Registro actualizado'));
	}
    // ...
	// User pressed the delete button for a todo, delete it
	function deleteButtonPressed(todo) {
		db.remove(todo);
	}
    // ...
	// The input box when editing a todo has blurred, we should save
	// the new title or delete the todo if the title is empty
	function todoBlurred(todo, event) {
		var trimmedText = event.target.value.trim();

		if (!trimmedText) {
			db.remove(todo);
		} else {
			todo.title = trimmedText;
			db.put(todo);
		}
	}
    // ...        
    ```

### 95. Tarea: Transformar nuestra TODO APP en una PWA
1. Crear **08-pouchdb-todo\sw.js**:
    ```js
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
    ```
2. Crear **08-pouchdb-todo\js\sw-utils.js**:
    ```js
    // Guardar en el cache dinámico
    function actualizaCacheDinamico(dynamicCache, req, res) {
        if(res.ok) {
            return caches.open(dynamicCache).then(caches => {
                caches.put(req, res.clone());
                return res.clone();
            });
        } else {
            return res;
        }
    }    
    ```
3. Modificar **08-pouchdb-todo\js\app.js**:
    ```js
    (function() {

        'use strict';

        // Registro del SW
        if (navigator.serviceWorker) {
            navigator.serviceWorker.register('./sw.js');
        }
        // ...
    })(); 
    ```

### 96. Tarea: Entrenamiento sobre PouchDB
+ **[09-pouchdb-manual+-+TAREA.zip](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion08/09-pouchdb-manual+-+TAREA.zip)**.
1. Çrear **09-pouchdb-manual\app.js**:
    ```js
    // Entrenamiento PouchDB

    // 1- Crear la base de datos
    // Nombre:  mensajes

    // Objeto a grabar en base de datos
    let mensaje = {
        _id: new Date().toISOString(),
        user: 'spiderman',
        mensaje: 'Mi tía hizo unos panqueques muy buenos',
        sincronizado: false
    };

    // 2- Insertar en la base de datos

    // 3- Leer todos los mensajes offline
    // Deben aparecer en la consola

    // 4- Cambiar el valor 'sincronizado' de todos los objetos en la BD a TRUE

    // 5- Borrar todos los registros, uno por uno, evaluando
    // cuales estan sincronizados
    // deberá de comentar todo el código que actualiza
    // el campo de la sincronización 
    ```
2. Crear **09-pouchdb-manual\index.html**:
    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>PouchDB</title>
    </head>
    <body>
        <h1>PouchDB</h1>

        <script src="pouchdb.min.js"></script>
        <script src="app.js"></script>
    </body>
    </html>    
    ```

### 97. Resolución de la tarea - PouchDB
1. Modificar **09-pouchdb-manual\app.js**:
    ```js
    // Entrenamiento PouchDB

    // 1- Crear la base de datos
    // Nombre:  mensajes
    const db = new PouchDB('mensajes');

    // Objeto a grabar en base de datos
    let mensaje = {
        _id: new Date().toISOString(),
        user: 'spiderman',
        mensaje: 'Mi tía hizo unos panqueques muy buenos',
        sincronizado: false
    };

    // 2- Insertar en la base de datos
    // db.put(mensaje).then(console.log('Registro insertado'));

    // 3- Leer todos los mensajes offline
    // Deben aparecer en la consola
    db.allDocs({include_docs: true, descending: false})
        .then(docs => {
            "use strict";
            console.log(docs.rows);
        });

    // 4- Cambiar el valor 'sincronizado' de todos los objetos en la BD a TRUE
    /* db.allDocs({include_docs: true, descending: false})
        .then(docs => {
            "use strict";
            docs.rows.forEach(row => {
                // console.log(row.doc);
                let doc = row.doc;
                doc.sincronizado = true;
                db.put(doc);
            });
        }); */

    // 5- Borrar todos los registros, uno por uno, evaluando
    // cuales estan sincronizados
    // deberá de comentar todo el código que actualiza
    // el campo de la sincronización
    db.allDocs({include_docs: true}).then(docs => {
        "use strict";
        docs.rows.forEach(row => {
            let doc = row.doc;
            if (doc.sincronizado) {
                db.remove(doc);
            }
        });
    });
    ```

### 98. Código fuente de la sección
+ **[Código fuente](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion08/08-pouchdb-todo.zip)**.


## Sección 9: Sincronización sin conexión - Offline Synchronization
### 99. Introducción a la sección
+ Sobre la intersección de una petición post cuando no se tiene internet.

### 100. Temas puntuales de la sección
+ Es momento de aplicar lo aprendido en la sección anterior, en nuestra aplicación real, poder grabar información para que posteriormente la sincronicemos con nuestro backend.
+ Adicionalmente tendremos que crear un lugar donde almacenar los mensajes y poder observar los cambios.
+ Esta sección también servirá como reforzamiento de varios temas.

### 101. Inicio del proyecto y backend server
+ **[10-twittor-offline-posting-inicio.zip](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion10/10-twittor-offline-posting-inicio.zip)**.
1. Crear proyecto **10-twittor-offline-posting** tomando como base el archivo comprimido facilitado anteriormente.
2. Modificar **10-twittor-offline-posting\package.json**:
    ```json
    // ...
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node server/server.js",
        "dev2": "./node_modules/nodemon/bin/nodemon.js server/server",
        "dev": "nodemon server/server.js"
    },
    // ...
    ```
3. Para levantar el proyecto, ejecutar:
    + $ cd 10-twittor-offline-posting
    + $ npm install
    + $ npm run dev

### 102. API REST - Get Mensajes
+ **[Postman](https://www.postman.com/downloads)**.
1. Modificar **10-twittor-offline-posting\server\routes.js**:
    ```js{5-11,15-16}
    // Routes.js - Módulo de rutas
    var express = require('express');
    var router = express.Router();

    const mensajes = [
        {
            _id: 'XYZ',
            user: 'spiderman',
            mensaje: 'Hola mundo'
        }
    ];

    // Get mensajes
    router.get('/', function (req, res) {
        // res.json('Obteniendo mensajes');
        res.json(mensajes);
    });

    module.exports = router;    
    ```
2. Para probar, realizar petición http:
    + URL: http://localhost:3000/api
    + Método: GET

### 103. Consumir servicio REST - Mostrar mensajes en pantalla
1. Modificar **10-twittor-offline-posting\public\js\app.js**:
    ```js
    var url = window.location.href;
    var swLocation = '/twittor/sw.js';

    if (navigator.serviceWorker) {
        if (url.includes('localhost')) {
            swLocation = '/sw.js';
        }
        navigator.serviceWorker.register(swLocation);
    }

    // Referencias de jQuery
    var titulo      = $('#titulo');
    var nuevoBtn    = $('#nuevo-btn');
    var salirBtn    = $('#salir-btn');
    var cancelarBtn = $('#cancel-btn');
    var postBtn     = $('#post-btn');
    var avatarSel   = $('#seleccion');
    var timeline    = $('#timeline');

    var modal       = $('#modal');
    var modalAvatar = $('#modal-avatar');
    var avatarBtns  = $('.seleccion-avatar');
    var txtMensaje  = $('#txtMensaje');

    // El usuario, contiene el ID del hÃ©roe seleccionado
    var usuario;

    // ===== Codigo de la aplicación
    function crearMensajeHTML(mensaje, personaje) {
        var content =`
        <li class="animated fadeIn fast">
            <div class="avatar">
                <img src="img/avatars/${ personaje }.jpg">
            </div>
            <div class="bubble-container">
                <div class="bubble">
                    <h3>@${ personaje }</h3>
                    <br/>
                    ${ mensaje }
                </div>
                
                <div class="arrow"></div>
            </div>
        </li>
        `;
        timeline.prepend(content);
        cancelarBtn.click();
    }

    // Globals
    function logIn(ingreso) {
        if (ingreso) {
            nuevoBtn.removeClass('oculto');
            salirBtn.removeClass('oculto');
            timeline.removeClass('oculto');
            avatarSel.addClass('oculto');
            modalAvatar.attr('src', 'img/avatars/' + usuario + '.jpg');
        } else {
            nuevoBtn.addClass('oculto');
            salirBtn.addClass('oculto');
            timeline.addClass('oculto');
            avatarSel.removeClass('oculto');
            titulo.text('Seleccione Personaje');
        }
    }

    // Seleccion de personaje
    avatarBtns.on('click', function() {
        usuario = $(this).data('user');
        titulo.text('@' + usuario);
        logIn(true);
    });

    // Boton de salir
    salirBtn.on('click', function() {
        logIn(false);
    });

    // Boton de nuevo mensaje
    nuevoBtn.on('click', function() {
        modal.removeClass('oculto');
        modal.animate({ 
            marginTop: '-=1000px',
            opacity: 1
        }, 200 );
    });

    // Boton de cancelar mensaje
    cancelarBtn.on('click', function() {
        if (!modal.hasClass('oculto')) {
            modal.animate({ 
                marginTop: '+=1000px',
                opacity: 0
            }, 200, function() {
                modal.addClass('oculto');
                txtMensaje.val('');
            });
        }
    });

    // Botón de enviar mensaje
    postBtn.on('click', function() {
        var mensaje = txtMensaje.val();
        if (mensaje.length === 0) {
            cancelarBtn.click();
            return;
        }
        crearMensajeHTML(mensaje, usuario);
    });

    // Obtener mensaje del servidor
    function getMensajes() {
        fetch('api')
            .then(res => res.json())
            .then(posts => {
                console.log(posts);
                posts.forEach(post => crearMensajeHTML(post.mensaje, post.user));
            });
    }

    getMensajes();    
    ```
2. Modificar **10-twittor-offline-posting\public\index.html**:
    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, height=device-height, viewport-fit=cover">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Twittor</title>
        <link href='https://fonts.googleapis.com/css?family=Quicksand:300,400' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css">
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.css">
        <link rel="shortcut icon" type="image/ico" href="img/favicon.ico"/>
        <link rel="manifest" href="manifest.json">
        <!-- Android -->
        <meta name="theme-color" content="#3498db">
        <!-- IOS -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <link rel="apple-touch-icon" href="img/icons/icon-192x192.png">
        <link rel="apple-touch-icon" sizes="152x152" href="img/icons/icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="img/icons/icon-192x192.png">
        <link rel="apple-touch-icon" sizes="167x167" href="img/icons/icon-152x152.png">
        <!-- iPhone X (1125px x 2436px) -->
        <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="img/icons-ios/apple-launch-1125x2436.png">
        <!-- iPhone 8, 7, 6s, 6 (750px x 1334px) -->
        <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href="img/icons-ios/apple-launch-750x1334.png">
        <!-- iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px) -->
        <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" href="img/icons-ios/apple-launch-1242x2208.png">
        <!-- iPhone 5 (640px x 1136px) -->
        <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" href="img/icons-ios/apple-launch-640x1136.png">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="apple-mobile-web-app-title" content="Twittor!">
    </head>
    <body>
            <!-- Titulo -->
            <span class="first"> 
                <span id="salir-btn" class="fa fa-sign-out-alt out oculto animated fadeIn"></span>
                <span id="titulo">
                    <i class="fa fa-user"></i>
                    Seleccione Personaje
                </span>
                <span id="nuevo-btn" class="fa fa-pen-square new oculto animated fadeIn fast"></span>
            </span>
            <!-- Fin Titulo -->

            <!-- Modal -->
            <div id="modal" class="oculto">
                <img id="modal-avatar" src="img/avatars/spiderman.jpg">
                <span class="first"> 
                    <span id="titulo-modal">Nuevo mensaje</span>
                    <span id="cancel-btn" class="fa fa-times"></span>
                </span>
                <div class="nuevo-mensaje">
                    <textarea id="txtMensaje" placeholder="Nuevo mensaje..." rows="5"></textarea>
                </div>
                <!-- boton de enviar -->
                <div id="post-btn" class="fab">
                    <i class="fa fa-paper-plane"></i>
                </div>
                <div id="post-btn" class="fab-marker">
                    <i class="fa fa-map-marker-alt"></i>
                </div>
                <div id="post-btn" class="fab-photo">
                    <i class="fa fa-image"></i>
                </div>
            </div>
            <!-- Fin Modal -->

            <!-- Seleccion de personaje -->
            <div id="seleccion" class="seleccion animated fadeIn fast" align="center">
                <div>
                    <img data-user="spiderman" src="img/avatars/spiderman.jpg" alt="spiderman" class="seleccion-avatar">
                </div>
                <div>
                    <img data-user="ironman" src="img/avatars/ironman.jpg" alt="ironman" class="seleccion-avatar">
                </div>
                <div>
                    <img data-user="wolverine" src="img/avatars/wolverine.jpg" alt="wolverine" class="seleccion-avatar">
                </div>
                <div>
                    <img data-user="thor" src="img/avatars/thor.jpg" alt="thor" class="seleccion-avatar">
                </div>
                <div>
                    <img data-user="hulk" src="img/avatars/hulk.jpg" alt="hulk" class="seleccion-avatar">
                </div>
            </div>
            <!-- FIN Seleccion de personaje -->

            <!-- Lista de mensajes -->
            <ul id="timeline" class="timeline oculto">
            </ul>
            <!-- Fin Lista de mensajes -->

            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script src="js/app.js"></script>
    </body>
    </html>    
    ```

### 104. Network with cache fallback - Para las peticiones a nuestra API
1. Modificar **10-twittor-offline-posting\public\sw.js**:
    ```js
    // imports
    importScripts('js/sw-utils.js');

    const STATIC_CACHE    = 'static-v1';
    const DYNAMIC_CACHE   = 'dynamic-v1';
    const INMUTABLE_CACHE = 'inmutable-v1';

    const APP_SHELL = [
        '/',
        'index.html',
        'css/style.css',
        'img/favicon.ico',
        'img/avatars/hulk.jpg',
        'img/avatars/ironman.jpg',
        'img/avatars/spiderman.jpg',
        'img/avatars/thor.jpg',
        'img/avatars/wolverine.jpg',
        'js/app.js',
        'js/sw-utils.js'
    ];

    const APP_SHELL_INMUTABLE = [
        'https://fonts.googleapis.com/css?family=Quicksand:300,400',
        'https://fonts.googleapis.com/css?family=Lato:400,300',
        'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
        'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.css',
        'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'
    ];

    self.addEventListener('install', e => {
        const cacheStatic = caches.open(STATIC_CACHE).then(cache => 
            cache.addAll(APP_SHELL));
        const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => 
            cache.addAll(APP_SHELL_INMUTABLE));
        e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
    });

    self.addEventListener('activate', e => {
        const respuesta = caches.keys().then( keys => {
            keys.forEach(key => {
                if (key !== STATIC_CACHE && key.includes('static')) {
                    return caches.delete(key);
                }
                if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
                    return caches.delete(key);
                }
            });
        });
        e.waitUntil(respuesta);
    });

    self.addEventListener( 'fetch', e => {
        let respuesta;
        if (e.request.url.includes('/api')) {
            respuesta = manejoApiMensajes(DYNAMIC_CACHE, e.request);
        } else {
            respuesta = caches.match(e.request).then(res => {
                if (res) {
                    actualizaCacheStatico(STATIC_CACHE, e.request, APP_SHELL_INMUTABLE);
                    return res;
                } else {
                    return fetch(e.request).then(newRes => {
                        return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
                    });
                }
            });
        }
        e.respondWith(respuesta);
    });
    ```
2. Modificar **10-twittor-offline-posting\public\js\sw-utils.js**:
    ```js
    // Guardar en el cache dinámico
    function actualizaCacheDinamico(dynamicCache, req, res) {
        if (res.ok) {
            return caches.open(dynamicCache).then(cache => {
                cache.put(req, res.clone());
                return res.clone();
            });
        } else {
            return res;
        }
    }

    // Cache with network update
    function actualizaCacheStatico(staticCache, req, APP_SHELL_INMUTABLE) {
        if (APP_SHELL_INMUTABLE.includes(req.url)) {
            // No hace falta actualizar el inmutable
            // console.log('existe en inmutable', req.url );
        } else {
            // console.log('actualizando', req.url );
            return fetch(req)
                .then(res => {
                    return actualizaCacheDinamico(staticCache, req, res);
                });
        }
    }

    // Network with cache fallback / update
    function manejoApiMensajes(cacheName, req) {
        return fetch(req).then(res => {
            if (res.ok) {
                actualizaCacheDinamico(cacheName, req, res.clone());
                return res.clone();
            } else {
                return caches.match(req);
            }
        }).catch(err => {
            return caches.match(req);
        });
    }    
    ```

### 105. API REST - Post Mensaje
+ **[body-parser.txt](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion10/body-parser.txt)**.
1. Ejecutar:
    + $ npm install body-parser --save
2. Modificar **10-twittor-offline-posting\server\server.js**:
    ```js
    const express = require('express');
    const bodyParser = require('body-parser');
    const path = require('path');
    const app = express();
    const publicPath = path.resolve(__dirname, '../public');
    const port = process.env.PORT || 3000;

    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

    // Directorio Público
    app.use(express.static(publicPath));

    // Rutas 
    const routes = require('./routes');
    app.use('/api', routes);

    app.listen(port, (err) => {
        if (err) throw new Error(err);
        console.log(`Servidor corriendo en puerto ${ port }`);
    });    
    ```
3. Modificar **10-twittor-offline-posting\server\routes.js**:
    ```js
    // Routes.js - Módulo de rutas
    var express = require('express');
    var router = express.Router();

    const mensajes = [
        {
            _id: 'XYZ',
            user: 'spiderman',
            mensaje: 'Hola mundo'
        }
    ];

    // Get mensajes
    router.get('/', function (req, res) {
        // res.json('Obteniendo mensajes');
        res.json(mensajes);
    });

    // Post mensajes
    router.post('/', function (req, res) {
        const mensaje = {
            mensaje: req.body.mensaje,
            user: req.body.user
        };
        mensajes.push(mensaje);
        res.json({
            ok: true,
            mensaje
        });
    });

    module.exports = router;    
    ```
4. Para probar, realizar petición http:
    + URL: http://localhost:3000/api
    + Método: POST
    + Body: 
        ```json
        {
            "mensaje": "Prueba Soluciones++",
            "user": "hulk"
        }
        ```

### 106. Envío de la petición POST
1. Modificar **10-twittor-offline-posting\public\js\app.js**:
    ```js
    // ...
    // Boton de enviar mensaje
    postBtn.on('click', function() {
        var mensaje = txtMensaje.val();
        if (mensaje.length === 0) {
            cancelarBtn.click();
            return;
        }
        var data = {
            mensaje: mensaje,
            user: usuario
        };
        fetch('api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        })
        .then(res => res.json())
        .then(res => console.log( 'app.js', res))
        .catch(err => console.log( 'app.js error:', err));

        crearMensajeHTML(mensaje, usuario);
    });
    // ...    
    ```
2. Modificar **10-twittor-offline-posting\server\routes.js**:
    ```js
    // ...
    // Post mensajes
    router.post('/', function (req, res) {
        const mensaje = {
            mensaje: req.body.mensaje,
            user: req.body.user
        };
        mensajes.push(mensaje);
        console.log(mensajes);
        res.json({
            ok: true,
            mensaje
        });
    });

    module.exports = router;    
    ```
3. Modificar **10-twittor-offline-posting\public\js\sw-utils.js**:
    ```js
    // ...
    // Network with cache fallback / update
    function manejoApiMensajes(cacheName, req) {
        if (req.clone().method === 'POST') {
            // Manejo del posteo de un nuevo mensaje
            return fetch(req);
        } else {
            return fetch(req).then(res => {
                if (res.ok) {
                    actualizaCacheDinamico(cacheName, req, res.clone());
                    return res.clone();
                } else {
                    return caches.match(req);
                }
            }).catch(err => {
                return caches.match(req);
            });
        }
    }    
    ```
4. Modificar **10-twittor-offline-posting\public\sw.js**:
    ```js{4}
    // imports
    importScripts('js/sw-utils.js');

    const STATIC_CACHE    = 'static-v2';
    // ...
    ```

### 107. Interceptar un POST y almacenar en indexedDB
1. Modificar **10-twittor-offline-posting\public\js\sw-utils.js**:
    ```js
    // ...
    // Network with cache fallback / update
    function manejoApiMensajes(cacheName, req) {
        if (req.clone().method === 'POST') {
            // Manejo del posteo de un nuevo mensaje
            req.clone().text(body => {
                // console.log(body);
                const bodyObj = JSON.parse(body);
                guardarMensaje(bodyObj);
            });
            return fetch(req);
        } else {
            return fetch(req).then(res => {
                if (res.ok) {
                    actualizaCacheDinamico(cacheName, req, res.clone());
                    return res.clone();
                } else {
                    return caches.match(req);
                }
            }).catch(err => {
                return caches.match(req);
            });
        }
    }    
    ```
2. Crear **10-twittor-offline-posting\public\js\sw-db.js**:
    ```js
    // Utilidades para grabar PouchDB
    const db = new PouchDB('mensajes');

    function guardarMensaje( mensaje ) {
        mensaje._id = new Date().toISOString();
        db.put(mensaje).then(() => {
            console.log('Mensaje guardado para posterior posteo');
        });
    }    
    ```
3. Modificar **10-twittor-offline-posting\public\sw.js**:
    ```js
    // imports
    importScripts('https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js');
    importScripts('js/sw-db.js');
    // ...
    const APP_SHELL = [
        // ...
    ];

    const APP_SHELL_INMUTABLE = [
        // ...
        'https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js'
    ];
    // ...
    ```

### 108. Registrar tarea asíncrona y SYNC del SW
1. Modificar **10-twittor-offline-posting\public\js\sw-utils.js**:
    ```js
    // ...
    // Network with cache fallback / update
    function manejoApiMensajes(cacheName, req) {
        if (req.clone().method === 'POST') {
            // Manejo del posteo de un nuevo mensaje
            if (self.registration.sync) {
                return req.clone().text(body => {
                    // console.log(body);
                    const bodyObj = JSON.parse(body);
                    return guardarMensaje(bodyObj);
                });
            } else {
                return fetch(req);
            }
        } else {
            return fetch(req).then(res => {
                if (res.ok) {
                    actualizaCacheDinamico(cacheName, req, res.clone());
                    return res.clone();
                } else {
                    return caches.match(req);
                }
            }).catch(err => {
                return caches.match(req);
            });
        }
    }    
    ```
2. Modificar **10-twittor-offline-posting\public\js\sw-db.js**:
    ```js
    // Utilidades para grabar PouchDB
    const db = new PouchDB('mensajes');

    function guardarMensaje( mensaje ) {
        mensaje._id = new Date().toISOString();
        return db.put( mensaje ).then( () => {
            self.registration.sync.register('nuevo-post');
            const newResp = { ok: true, offline: true };
            return new Response( JSON.stringify(newResp) );
        });
    }    
    ```
3. Modificar **10-twittor-offline-posting\public\sw.js**:
    ```js
    // ...
    // Tareas asincronas
    self.addEventListener('sync', e => {
        console.log('SW: sync');
        if(e.tag === 'nuevo-post') {
            // Postear a DB cuando hay conexión
        }
    });    
    ```

### 109. Disparar posteos cuando hay conexión a internet
1. Modificar **10-twittor-offline-posting\public\sw.js**:
    ```js
    // ...
    // Tareas asincronas
    self.addEventListener('sync', e => {
        console.log('SW: sync');
        if(e.tag === 'nuevo-post') {
            // Postear a DB cuando hay conexión
            const respuesta = postearMensaje();
            e.waitUntil(respuesta);
        }
    });    
    ```
2. Modificar **10-twittor-offline-posting\public\js\sw-db.js**:
    ```js
    // ...
    // Postear mensajes a la API
    function postearMensaje() {
        const posteos = [];
        return db.allDocs({ include_docs: true }).then( docs => {
            docs.rows.forEach( row => {
                const doc = row.doc;
                const fetchPom =  fetch('api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(doc)
                    }).then( res => {
                        return db.remove(doc);
                    });
                posteos.push(fetchPom);
            }); // fin del foreach
            return Promise.all(posteos);
        });
    }    
    ```

### 110. Front-End: Detectar cambios de conexión a internet
+ **[GitHub dmuy/Material-Toast](https://github.com/dmuy/Material-Toast)**.
+ **[Material-Toast-master.zip](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion10/Material-Toast-master.zip)**.
1. Modificar **10-twittor-offline-posting\public\js\app.js**:
    ```js
    // ...
    // Detectar cambios de conexión
    function isOnline() {
        if (navigator.onLine) {
            // tenemos conexión
            // console.log('online');
            $.mdtoast('Online', {
                interaction: true,
                interactionTimeout: 1000,
                actionText: 'OK!'
            });
        } else{
            // No tenemos conexión
            $.mdtoast('Offline', {
                interaction: true,
                actionText: 'OK',
                type: 'warning'
            });
        }
    }

    window.addEventListener('online', isOnline);
    window.addEventListener('offline', isOnline);

    isOnline();    
    ```
2. Modificar **10-twittor-offline-posting\public\index.html**:
    ```html{6,12}
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <!-- ... -->
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="js/libs/plugins/mdtoast.min.css">
        <!-- ... -->
    </head>
    <body>
        <!-- ... -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="js/libs/plugins/mdtoast.min.js"></script>
        <script src="js/app.js"></script>
    </body>
    </html>    
    ```
3. Modificar **10-twittor-offline-posting\public\sw.js**:
    ```js{14-15}
    // ...
    const APP_SHELL = [
        '/',
        'index.html',
        'css/style.css',
        'img/favicon.ico',
        'img/avatars/hulk.jpg',
        'img/avatars/ironman.jpg',
        'img/avatars/spiderman.jpg',
        'img/avatars/thor.jpg',
        'img/avatars/wolverine.jpg',
        'js/app.js',
        'js/sw-utils.js',
        'js/libs/plugins/mdtoast.min.css',
        'js/libs/plugins/mdtoast.min.js'
    ];
    // ...    
    ```

### 111. Código fuente de la sección
+ **[Código fuente](https://github.com/petrix12/pwa2022/blob/main/recursos/seccion10/10-twittor-offline-posting.zip)**.


## Sección 10: Notifications - Push Notifications - Push Server
### 112. Introducción a la sección
1 min
Iniciar







    ```js
    ```



### 113. Temas puntuales de la sección
1 min
Reproducir
### 114. Introducción al envío de Push Notifications
10 min
Reproducir
### 115. Inicio del proyecto - Push Notifications
3 min
Reproducir
### 116. Permisos para notificaciones
10 min
Reproducir
### 117. Detalle estético - Mostrar y ocultar botón de las notificaciones
4 min
Reproducir
### 118. Definir los servicios REST necesarios - PUSH - SUBSCRIBE - KEY
5 min
Reproducir
### 119. Generar la llave pública y privada
8 min
Reproducir
### 120. Retornando nuestro KEY de forma segura
7 min
Reproducir
### 121. Generar la suscripción
9 min
Reproducir
### 122. Enviar la suscripción al servidor - POST
12 min
Reproducir
### 123. Guardar suscripciones en el backend para que sean persistentes
8 min
Reproducir
### 124. Cancelar la suscripción - Front-End
5 min
Reproducir
### 125. Configurar web-push
14 min
Reproducir
### 126. Opciones de una notificación
13 min
Reproducir
### 127. Más opciones de las notificaciones
10 min
Reproducir
### 128. Redireccionando desde la notificación
13 min
Reproducir
### 129. Borrar suscripciones que ya no son válidas
8 min
Iniciar
### 130. Código fuente de la sección
1 min
Reproducir


## Sección 11: Recursos Nativos
### 131. Introducción a la sección
1 min
Iniciar
### 132. Temas puntuales de la sección
1 min
Reproducir
### 133. Inicio del proyecto - Recursos Nativos
7 min
Reproducir
### 134. Uso de la Geolocalización
6 min
Reproducir
### 135. POST con las coordenadas y el mapa
6 min
Reproducir
### 136. Mostrar video de la cámara
11 min
Iniciar
### 137. Nota: Camara posterior
1 min
Reproducir
### 138. Tomar Foto y apagar cámara
9 min
Reproducir
### 139. Mostrar la fotografía como un mensaje
4 min
Reproducir
### 140. Share API
12 min
Iniciar
### 141. Código fuente de la sección
1 min
Reproducir


## Sección 12: Bonus: @angular/pwa
### 142. Introducción a la sección
1 min
Iniciar
### 143. Temas puntuales de la sección
1 min
Reproducir
### 144. Inicio de proyecto - Angular PWA
6 min
Reproducir
### 145. Rutas de nuestra aplicación
6 min
Reproducir
### 146. Servicio y manejo de información - Agregar interfaz y URL
10 min
Reproducir
### 147. Página del país
10 min
Iniciar
### 148. Documentación de @angular/pwa
1 min
Reproducir
### 149. ng add @angular/pwa
9 min
Reproducir
### 150. Configuraciones en el archivo ngsw-config.json
12 min
Iniciar
### 151. Código fuente de la sección
1 min
Iniciar


## Sección 13: Cierre del curso
### 152. Promociones especiales para alumnos
+ **Más cursos**: Si desean más cursos gratuitos, los tengo listados aquí para que los puedan tomar fácilmente:
    + [Fernando Herrera - Cursos gratuitos](https://fernando-herrera.com/#/cursos-gratis).
+ Y también aquí pueden encontrar todos mis cursos al menor precio posible siempre, todo el año:
    + [Fernando Herrera - Cursos de pago al menor precio posible siempre](https://fernando-herrera.com/#/home).
+ **Subir el certificado de Udemy**: Pueden subir su certificado que les genera Udemy a mi página web, y participar en promociones, regalos, otras cosas que se me ocurran, simplemente descarguen el certificado que les genera Udemy y subanlo aquí:
    + [Logros de Alumnos - Fernando Herrera](https://fernando-herrera.com/#/logros).
+ **Nota**: Si pueden, usen los cupones de mi sitio web, eso me ayuda a mi y ustedes siempre lo tendrán al menor precio possible que puedo dejarlos $9.99.

### 153. Despedida
+ Despedida del curso.


## Utilidades
+ Raíz del respositorio GitHub: https://github.com/petrix12/pwa2022/blob/main/
+ Levantar servidor con **http-server**:
    + $ http-server -o -p 8082
    + Cambiar luego la dercción de **http://127.0.0.1:8082** a **http://localhost:8082**.