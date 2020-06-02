function sumarUno(numero) {

  var promesa = new Promise(function (resolve, reject) {

    if (numero >= 6) {
      reject("Numero muy Alto");
    }

    setTimeout(function () {

      //return numero + 1;  
      resolve(numero + 1);

    }, 800);


  });

  return promesa;

}


sumarUno(5).then(sumarUno).then(sumarUno).then(nuevoNumero3 => {

  console.log(nuevoNumero3);
  //return sumarUno(nuevoNumero);

}).catch(error => {
  console.log('Error en promesa: ');
  console.log(error);
});
