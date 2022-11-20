// Ejemplo para vaciar el código de una página, en tú página
// Para ejeuctar este código es necesario activar CORS
fetch('https://www.wikipedia.org')
    .then(resp => resp.text())
    .then(html => {
        document.open();
        document.write(html);
        document.close();
    });