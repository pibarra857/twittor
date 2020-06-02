
self.addEventListener('fetch', event => {

    //Clase 38
    /* 
    if (event.request.url.includes('.jpg')){
 
         console.log(event.request.url);
         let fotoReq = fetch(event.request);
         event.respondWith(fotoReq);
 
    }
    */

    //Clase 40
    /*
    if (event.request.url.includes('main.jpg')) {

       event.respondWith( fetch('img/main-patas-arriba.jpg'));

    }
    */

    const resp = fetch( event.request )
    .then( resp => {
        return resp.ok ? resp : fetch("img/main.jpg");
    });

    event.respondWith( resp );

});