##ToDo

- Ver por qué carajo no está tirando el `console.log(pija6)` (el que viene después del for each de locations_container).


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
