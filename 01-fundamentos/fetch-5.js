

fetch('https://reqres.in/api/users/1')
.then( resp => {

    resp.json()
    .then( console.log );


})
.catch( error => {
    console.log("Ha ocurrido un error");
    console.log(error);
});