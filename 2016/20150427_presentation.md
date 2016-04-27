## Augmentation adaptada

Elegí la de las *locations* para adaptar. Esta tenía dos partes: primero obtenía las locations parseando una web, y luego obtenía las imágenes desde DBpedia. Me centré en la segunda, tomando como base directamente el sitio de las locations [imdb.com/title/../locations](http://www.imdb.com/title/tt2084970/locations).

## Flujo

Describo la operatoria que debería llevar a cabo un usuario de nuestr~~a~~o ~~librería~~ framework. Originalmente no lo escribí pensándolo en esos términos, por eso hay partes tachadas. Dejo estas partes porque pueden ser útiles para entender cómo se llevan a cabo algunas cosas del lado de adentro.

Empiezo a instanciar objetos:

### Extraction Selector

Para instanciar al `Selector`, yo tenía que decirle cómo obtener el DOM los elementos HTML. Acá, lo que quiero es el elemento HTML con id `"filming_locations_content`. Después juego un poco con el array porque descarto el primer elemento que es un título. Lo que le envío es una función *arrow*, los nuevos *closures* (según entiendo la definición de [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming))) de JS.

```js
var extractionSelector = new Selector(() => {
  // in order to get a proper array, I have to do this
  var elements = doc.getElementById("filming_locations_content").children;
  var arr = [].slice.call(elements)
  arr.splice(0, 1)
  return arr;
});
```

~~Al ser invocada esta función en el `run()` de `Selector`, retorna el array con elementos HTML y luego cada uno de ellos es agregado a un objeto `AugmentationWrapper`, que es el objeto que guarda todos los *momentos* de cada elemento de la augmentation, y dicho objeto a una colección de estos llamada `augmentationWrappers`.~~

### Extractor

El Extractor va a tomar cada elemento seleccionado por el Selector y va a extraer de él la información que nos interesa. Para eso, le decimos cómo tiene que hacerlo mediante una función anónima:

```js
var extractor = new Extractor(
  function(location_container) {
    return location_container.children[0].children[0].innerHTML.split(',')[0];
  }
);
```

En el `run()` de `Extractor`, el valor obtenido de correr esta función *arrow* será agregado al `AugmentationWrapper` correspondiente.

### Query

A la `Query` le decimos cuál será el *endpoint* (por defecto DBpedia) y le pasamos la query SPARQL propiamente dicha con el siguiente formato: `["select * where a = ", ";"]` (lo escribo en SQL por simplicidad).

```
var query = new Query(
  new Endpoint(),
  [
    "prefix dbpedia-owl: <http://dbpedia.org/ontology/>" + "\n" +
      "prefix dbpprop: <http://dbpedia.org/property/>" + "\n" +
      "select ?o where { ?s dbpprop:name \"",
    "\"@en ." + "\n" + "?s dbpedia-owl:thumbnail ?o }"
  ]
);
```

~~Luego `query.execute()` recibe como argumento la parte faltante de la query SPARQL, la *ensambla*, efectúa la consulta y retorna los resultados, que serán utilizados por `Getter`.~~

### Getter

Así como el `extractor` debía conocer cómo lidiar con lo seleccionado por el `selector`, el `getter` debe lidiar con lo obtenido por la `query`. Para instanciarlo, le enviamos una función anónima y la `query`. Por dentro, el `getter` ejecutará la query enviándole lo que obtuvo el `extractor`.

```js
var getter = new Getter(
  function(data) {
    var results = {};
    if (data.results.bindings.length > 0) {
      results["thumbnail"] = data.results.bindings[0].o.value;
    }
    return results;
  },
  query
)
```

## En funcionamiento

Describiendo un poco el flujo interno:

* `Augmentation` se crea enviándole los objetos que interactuarán. En este caso, se le envía:

```js
var aug = new Augmentation(
  extractionSelector,
  extractor,
  getter
);
```

Por dentro, mantendrá una colección de objetos `AugmentationWrapper`. Cada uno de estos consiste en las diferentes transformaciones de un elemento a *augmentar*:

1. Elemento HTML
2. Datos extraídos (String) del elemento HTML
3. Hash con los datos obtenidos mediante la consulta semántica

Cada *paso* de la ejecución agrega una de estas transformaciones, y al final de la ejecución se espera que consten de todos ellos.

El resultado de correr nuestro código nos arroja el siguiente objeto Javascript, en el que podemos ver las transformaciones. (Cabe aclarar que en los objetos cuyo atributo `gotten` es un hash vacío, no se obtuvieron resultados de la consulta semántica.)

```js
[ { selected: { undefined: [Object] },
    extracted: 'Sherborne School',
    gotten: { thumbnail: 'http://commons.wikimedia.org/wiki/Special:FilePath/Dorset_sherbone_school.jpg?wi... (length: 87)' } },
  { selected: { undefined: [Object] },
    extracted: 'Bicester Aerodrome',
    gotten: {} },
  { selected: { undefined: [Object] },
    extracted: 'King\'s Cross Station',
    gotten: {} },
  { selected: { undefined: [Object] },
    extracted: 'Chesham',
    gotten: { thumbnail: 'http://commons.wikimedia.org/wiki/Special:FilePath/Chesham_station_building.jpg?... (length: 89)' } },
  { selected: { undefined: [Object] },
    extracted: 'Sherborne School',
    gotten: { thumbnail: 'http://commons.wikimedia.org/wiki/Special:FilePath/Dorset_sherbone_school.jpg?wi... (length: 87)' } },
  { selected: { undefined: [Object] },
    extracted: 'Aldwych Underground Station',
    gotten: {} },
  { selected: { undefined: [Object] },
    extracted: 'Joyce Grove',
    gotten: {} },
  { selected: { undefined: [Object] },
    extracted: 'London',
    gotten: { thumbnail: 'http://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_the_City_of_London.sv... (length: 91)' } } ]
```

## Código

El código es corto, no es complejo y sabiendo lo que más o menos hace, yo creo que lo van a poder seguir sin ninguna complicación. Está en este directorio: [github.com/cfsottile/lifia-semantic-augmentation/tree/master/2016/code/es6/src](https://github.com/cfsottile/lifia-semantic-augmentation/tree/master/2016/code/es6/src).

No lo van a poder correr así nomás porque es *ECMAScript 6* y todavía no está muy soportado. Hay que compilarlo a *ECMAScript 5* con *babel*, y también uso algunos paquetes de *nodejs* para obtener el sitio HTML y armar un DOM. Yo calculo que va a funcionar si hacen lo siguiente:

1. se clonan el repositorio
2. van hasta el directorio `2016/code`
2. corren `npm install`
3. corren `npm run myug; npm run buildf`
4. corren `node finalfinal.js`