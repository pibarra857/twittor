
//const CACHE_NAME = 'cache-1';

const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';
const CACHE_DYNAMIC_LIMIT = 50;

function limpiarCache(cacheName, numeroItems) {
    caches.open(cacheName)
        .then(cache => {

            return cache.keys()
                .then(keys => {
                    if (keys.length > numeroItems) {
                        cache.delete(keys[0])
                            .then(limpiarCache(cacheName, numeroItems));
                    }
                });

        });
}



self.addEventListener('install', e => {

    const cacheProm = caches.open(CACHE_STATIC_NAME)
        .then(cache => {

            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/img/main.jpg',
                '/img/no-img.jpg',
                '/js/app.js'
            ]);

        });

    const cacheInmuta = caches.open(CACHE_INMUTABLE_NAME)
        .then(cache => {

            return cache.addAll([
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
            ]);

        });

    e.waitUntil(Promise.all([cacheProm, cacheInmuta]));

});



self.addEventListener('fetch', e => {

    // 1-Cache only
    //Toda la aplicacion sea sevida desde el cahceh
    //e.respondWith( caches.match(e.request));


    // 2-Cache with network fallback
    //Si no encuentra en el cache va a internet
    /*
    const respuesta = caches.match( e.request )
    .then( resp => {

        if (resp) return resp;

        //Si no existe el archivo pedido
        //Entonces tengo que ir a la red
        //console.log("No existe", e.request);

        return fetch(e.request)
        .then( newResp => {

            caches.open( CACHE_DYNAMIC_NAME )
            .then( cache => {
                cache.put(e.request, newResp);
                limpiarCache(CACHE_DYNAMIC_NAME,CACHE_DYNAMIC_LIMIT);
            });


            return newResp.clone();
        });

    });

    e.respondWith( respuesta );
    */


    // 3-Network with cache fallback
    //Primero la web luego en el dispositivo
    /*
    const respuesta = fetch(e.request).then( resp => {

       if (!resp) return caches.match(e.request);

        caches.open( CACHE_DYNAMIC_NAME )
        .then( cache => {
            cache.put(e.request, resp);
            limpiarCache(CACHE_DYNAMIC_NAME,CACHE_DYNAMIC_LIMIT);
        });

        return resp.clone();

    }).catch( error => {
        return caches.match( e.request );
    });

    e.respondWith( respuesta );
    */


    // 4-Cache con network update
    // Rendimiento critico
    // Actualizacion siempre un paso atras
    /*
    if (e.request.url.includes('bootstrap')){
        return e.respondWith(caches.match(e.request));
    }

    const respuesta = caches.open(CACHE_STATIC_NAME).then( cache =>{

        fetch(e.request).then( newRes =>{

            cache.put(e.request, newRes);

        });

        return cache.match(e.request);

    });

    e.respondWith( respuesta );
    */

    // 5-Cache y Network Race
    // Carrera ve primero quier responde

    const respuesta = new Promise((resolve, reject) => {

        let rechazada = false;

        const falloUnaVez = () =>{

            if (rechazada){

                if (/\.(png|jpg)$/i.test(e.request.url)){
                    resolve(caches.match('/img/no-img.jpg'));
                }else{
                    reject('No se encontro respuesta');
                }

            }else{
                rechazada = true;
            }

        };

        fetch(e.request).then(res =>{

            if (res.ok){
                resolve(res);
            }else{
                falloUnaVez();
            }

        }).catch(falloUnaVez);

        caches.match(e.request).then( res =>{

            if (res.ok){
                resolve(res);
            }else{
                falloUnaVez();
            }

        }).catch(falloUnaVez);


    });

    e.respondWith( respuesta );

});    