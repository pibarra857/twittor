

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js');
}

//Video 58
/*
if (window.caches) {

    caches.open('Prueba-1');
    caches.open('Prueba-2');

    // caches.has('Prueba-2').then(console.log);

    //caches.delete('Prueba-1').then(console.log);

    caches.open('cache-v1.1').then(cache => {

        //cache.add('/index.html');

        cache.addAll([
            '/index.html',
            'css/style.css',
            'img/main.jpg'
        ]).then( () => {

            cache.delete('css/style.css');

        });

        cache.match('/index.html').then( resp =>{

            resp.text().then(console.log);

        });

    });

    caches.keys().then( keys => {

        console.log(keys);

    });

}   
*/

