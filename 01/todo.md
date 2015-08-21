##ToDo

- Party 😎

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
