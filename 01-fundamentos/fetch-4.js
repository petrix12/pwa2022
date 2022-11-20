let img = document.querySelector('img')

fetch('superman.png')
    .then(resp => resp.blob())
    .then(imagen => {
        let imgPath = URL.createObjectURL(imagen);
        img.src = imgPath;
        img.alt = "Supermán";
    })