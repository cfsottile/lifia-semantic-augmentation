##ToDo

- Ver por qué carajo no está tirando el `console.log(locations)`.
- Ver por qué no está recibiendo nada en el param `location` en el method `getImageUrlFromLocation`.



//clavar un 'locations?ref_=ttloc_ql_6' despues de la URL para acceder a la pagina de FILM LOCATIONS

//siendo document el DOM de la pagina de FILM LOCATIONS

locations_containter = document.getElementById("filming_locations_content");

for each (location_containter in locations_containter.children) {

  console.log(location_containter.children[0].children[0].innerHTML.split(',')[0]);  

}

//URL de la pagina acutal

console.log(document.URL);




//AJAX para conseguir la pagina de location de la url actual

```
$.ajax({
  		dataType: "xml",
  		url: (document.URL + 'locations?ref_=ttloc_ql_6'),
      callback: function(_data){

        console.log('PUTA');


      }
});

```
