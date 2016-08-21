Buenas, les comento lo que estuve haciendo.

*Para mayor legibilidad, voy a usar `aw` para referirme a `augmentationWrapper`, y `aws` para referirme a a la colección `augmentationWrappers`.*

La clase `Builder` está funcionando con el siguiente esquema:

* Recibe un `htmlString` en el que:
	* hay un `div` con `id="itemTemplate"`;
	* se indica mediante `{{key}}` los valores que se desean incluir a partir del hash devuelto por el `getter`.
* Para cada `aw`:
	* genera un string HTML a partir del `div` `itemTemplate`;
	* reemplaza los valores `{{key}}` por su respectivo valor en el hash (`gotten[key]`);
	* agrega el string *fulfilled* como el *built object* en `aw`.

Sólo se contempla el caso *N a N*. La colección `aws` se pasa al `builder`, este toma el elemento `gotten` de cada `aw`, genera el elemento `built` y lo agrega a dicho `aw`.

Faltaría ver que el `builder` pueda lidiar con que la augmentation sea *N a 1*, lo que implicaría abstraer a quién le estamos *agregando* el *built object*: habría un objeto `result` que entendería el mensaje `add(builtObject)` y se encargaría de agregarlo al `aw` (como ya hace ahora), o bien a un nodo HTML que consistiría en el único objeto resultante del `builder`.

También seguramente evalúe si es conveniente que el dato de entrada y/o el de salida sean, en vez de strings HTML, nodos HTML.

Como siempre el código [está en el repo](https://github.com/cfsottile/lifia-semantic-augmentation/tree/master/2016/code/es6/src). La nueva funcionalidad está reflejada en la augmentation que venía adaptando. Por si quieren verlo, les adjunto los resultados que arroja la prueba a partir del siguiente *template*:

```html
<div id="container">
	<div id="itemTemplate">
		<p>
			{{thumbnail}}
		</p>
	</div>
</div>
```

```javascript
[ { selected: { undefined: [Object] },
    extracted: 'Sherborne School',
    gotten: { thumbnail: 'http://commons.wikimedia.org/wiki/Special:FilePath/Dorset_sherbone_school.jpg?wi... (length: 87)' },
    built: '<div id="itemTemplate"> <p> http://commons.wikimedia.org/wiki/Specia... (length: 147)' },

  { selected: { undefined: [Object] },
    extracted: 'Bicester Aerodrome',
    gotten: {},
    built: '<div id="itemTemplate"> <p> undefined </p> </div>' },

  { selected: { undefined: [Object] },
    extracted: 'King\'s Cross Station',
    gotten: {},
    built: '<div id="itemTemplate"> <p> undefined </p> </div>' },

  { selected: { undefined: [Object] },
    extracted: 'Chesham',
    gotten: { thumbnail: 'http://commons.wikimedia.org/wiki/Special:FilePath/Chesham_station_building.jpg?... (length: 89)' },
    built: '<div id="itemTemplate"> <p> http://commons.wikimedia.org/wiki/Specia... (length: 149)' },

  { selected: { undefined: [Object] },
    extracted: 'Sherborne School',
    gotten: { thumbnail: 'http://commons.wikimedia.org/wiki/Special:FilePath/Dorset_sherbone_school.jpg?wi... (length: 87)' },
    built: '<div id="itemTemplate"> <p> http://commons.wikimedia.org/wiki/Specia... (length: 147)' },

  { selected: { undefined: [Object] },
    extracted: 'Aldwych Underground Station',
    gotten: {},
    built: '<div id="itemTemplate"> <p> undefined </p> </div>' },

  { selected: { undefined: [Object] },
    extracted: 'Joyce Grove',
    gotten: {},
    built: '<div id="itemTemplate"> <p> undefined </p> </div>' },

  { selected: { undefined: [Object] },
    extracted: 'London',
    gotten: { thumbnail: 'http://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_the_City_of_London.sv... (length: 91)' },
    built: '<div id="itemTemplate"> <p> http://commons.wikimedia.org/wiki/Specia... (length: 151)' } ]
```

E imprimiendo sólo los `built`:

```html
<div id="itemTemplate"> <p> http://commons.wikimedia.org/wiki/Special:FilePath/Dorset_sherbone_school.jpg?width=300 </p> </div>

<div id="itemTemplate"> <p> undefined </p> </div>

<div id="itemTemplate"> <p> undefined </p> </div>

<div id="itemTemplate"> <p> http://commons.wikimedia.org/wiki/Special:FilePath/Chesham_station_building.jpg?width=300 </p> </div>

<div id="itemTemplate"> <p> http://commons.wikimedia.org/wiki/Special:FilePath/Dorset_sherbone_school.jpg?width=300 </p> </div>

<div id="itemTemplate"> <p> undefined </p> </div>

<div id="itemTemplate"> <p> undefined </p> </div>

<div id="itemTemplate"> <p> http://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_the_City_of_London.svg?width=300 </p> </div>
```