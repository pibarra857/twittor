
// Ciclo de vida del SW

//SW se instala
self.addEventListener('install', event => {

    console.log("SW: Instalando SW");

    const instalacion = new Promise( (resolve, reject) =>{

        console.log("SW: Instalacion Finalizada");
        //self.skipWaiting(); no es conveniente dejar
        resolve();

    });
    
    event.waitUntil( instalacion );

});

//SW toma el control de la aplicacion
self.addEventListener('activate', event => {

    //Borrar cache viejo
    console.log("SW: Activando SW");

});

//FETCH: Manejo de Peticiones HTTP
self.addEventListener('fetch', event => {

});

//SYNC: cuando recuperamos la conexion a internet
self.addEventListener('sync', event => {

    console.log("SW: Tenemos conexion");

});

//PUSH: Manejar las push notifications
self.addEventListener('push', event => {

    console.log("SW: Pusheando");

});