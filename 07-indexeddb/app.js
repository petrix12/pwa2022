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

