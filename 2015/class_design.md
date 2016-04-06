# Clases y responsabilidades
* Augmentation
* Selector: retorna elemento/s del DOM.
* Extractor
* Getter
	* SemanticGetter
	* DomParserGetter
	* ApiGetter
* Builder
* Injector

# Esquema
Un **selector** obtiene un cierto elemento del documento. El **extractor** aplica una cierta función sobre el elemento. El **getter** usa los datos obtenidos por el *extractor* para obtener cierta información relacionada. Esta información puede ser utilizada por otro *getter*, o ser pasada al **builder**, quien, generará un elemento HTML con la misma si corresponde, o bien dejará el dato intacto. El **injector** obtendrá un elemento del documento mediante otro **selector**, y aplicará cierta función, que se encargará de agregar al documento los datos provenientes del *builder*.

# N
Se genera un debate en torno a quién debe ocuparse de que sean N la cantidad de augmentations a llevar a cabo: el objeto augmentation o cada objeto (selector, extractor, getter, etc.) internamente.

#### Augmentation
En este caso, las iteraciones deberían estar en la Augmentation, quedando el siguiente flujo:

Obtención de los ~~elementos~~ datos a *augmentar* mediante un **selector**. Estos elementos vendrán en forma de colección. Iteración sobre cada elemento de la colección. Según la forma en que deba culminar la augmentation (N augmentations distintas o una que integre a todos los elementos augmentados), la iteración incluiría el `run` del **builder** o no lo haría. Es decir, en caso de que cada augmentation se inserte en el documento independientemente de las demás, cada iteración ejecutaría el `run` de **injector**, ya que hay una modificación del documento para cada elemento a augmentar; en caso de que las augmentations sean agregadas a un elemento que luego será insertado de forma única, la iteración debería ocuparse de darle datos al buider, y el `run` del **builder** y de **injector** quedaría fuera de la misma, ya que se ejecutarían una sola vez.

Ejemplo augmentation culmina en N augmentations 

```javascript
data = extractor.run();
data.forEach(d => injector.run(builder.run(getter.run(d))));
```

Ejemplo augmentation culmina en 1 augmentation

```javascript
data = extractor.run();
data.forEach(d => builder.add(getter.run(d)));
injector.run(builder.run());
```

#### Cada objeto
Aquí la lógica de las iteraciones se incluiría en los objetos. **extractor** los datos usando un **selector**, y para cada dato enviaría un mensaje `run` a **getter**, que, según la culminación de la augmentation (N o 1), deberá correr el injector junto con el builder N veces o agregar los datos augmentados N veces para luego correr el injector junto con el builder una sola vez.

Ejemplo

```
class Extractor {
	run() {
		let data = selector.run().map(e => parse(e));
		data.forEach(d => getter.run(d));
	}
}

class Getter {
	run (data) {
		let augmentedData;
		// augmentation here
		if (culmination === "n") {
			builder.run(augmentedData);
		} elsif (culmination === "1" {
			builder.add(augmentedData);
		}
	}
}

class Builder {
	add (augmentedData) {
		this.augmentedData.push(augmentedData);
		
		// barrier
		if (augmentedData.length === n) {
			this.run();
		}
	}
	
	run (augmentedData) {
		let augmentedData ||= this.augmentedData;
		// ...
		injector.run(builtData);
	}
}

class Injector {
	run (builtData) {
		injectionFunction(selector.run(), builtData);
	}
}

/*
 * Aclaraciones:
 *   - Extractor e Injector tienen su propio selector.
 */
```

# Instanciación

## Selector
> Un **selector** obtiene un cierto elemento del documento.

Tenemos diferentes formas de obtener elementos del DOM:

* Xpath
* JQuery (CSS Selectors)
* Código javascript

A priori tendremos una sola clase **Selector** que se instanciará con:

* *target*: string mediante el cual se obtendrá el o los elementos.
* *mode*: string que indica cómo obtener el o los elementos.

Ejemplo:

```
selector = new Selector(".locations-div", "jquery");
```

**En una nueva sección *Uso* analizaremos el funcionamiento interno de la clase**

## Extractor
> El **extractor** aplica una cierta función sobre el elemento.

Recibirá un selector instanciado y una función a aplicar. La función recibirá el elemento devuelto por el selector.

Ejemplo:

```
selector = new Selector(".location", "jquery");

extractionFunction = function (element) {
	return element.innerHTML;
}

extractor = new Extractor(selector, extractionFunction);
```

## Getter
> El **getter** usa los datos obtenidos por el *extractor* para obtener cierta información relacionada. Esta información puede ser utilizada por otro *getter* o ser pasada al **builder**.

Recibe un conocimiento *base*, los datos obtenidos por el extractor, una función de acción y una función opcional de completado de base.

* *conocimiento base*: la parte fija en la que se va a basar el objeto para iniciar la augmentation. Por ejemplo, las partes fijas de la URL en un DomParser, la parte invariable de la consulta SPARQL en un Semantic. Se deben enviar en forma de array de strings; la separación debe hacerse de tal forma que entre cada string se deban incluir luego las partes faltantes.
* *datos obtenidos por el extractor*: vienen en forma de array; se toman los elementos de este array y los del array base y se los intercala.
* *función de acción*: función a ejecutar sobre los datos obtenidos por el propio getter. Es la generadora de la augmentación de los datos.
* *función opcional de completado de base*: en caso de que se requiera manipular los array base y de extractor de forma distinta a un intercalado, se puede enviar una función.

Ejemplo:

```
selector = new Selector("window", "js");

extractionFunction = function (object) {
	object.getMovieId();
}
extractor = new Extractor(selector, extractionFunction);

base = [ "www.imdb.com/title/", "/locations" ];
actionFunction = function (dom) {
	// do some shit with DOM
}
getter = new DomParserGetter(base, extractor, actionFunction);
```

### Nota: caso especial

Tenemos que parsear el DOM de una cierta URL, por ejemplo: `www.imdb.com/title/:id/locations`. Tenemos dos partes conocidas, y una parte desconocida (:id). Siendo que el Getter es el que conoce la base de el lugar que va a usar para augmentar la info, resulta correcto que conozca las partes conocidas de la URL: `www.imdb.com/title/` y `/locations`. El id se obtiene más o menos del DOM, usando el objeto `window`. Para seguir con la lógica general de Selector, en la que toma un elemento del DOM y lo retorna, podría retornar el objeto window, y Extractor podría aplicarle la función correspondiente para obtener el id (supongamos `getMovieId()`. 

Cuestión, tenemos un DomParserGetter que conoce una parte de la URL y un extractor que le va a proveer la parte que desconoce, la cual depende del DOM actual y será obtenida mediante la aplicación de una función sobre un elemento retornado por un selector.

```
selector = new Selector("window", "js");
extractionFunction = function (object) {
	object.getMovieId();
}
extractor = new Extractor(selector, extractionFunction);
getter = 
```

## Objetos de comunicación

* Selector - Extractor: un array con los elementos obtenidos del dom.
* Extractor - Getter: un array con los elementos obtenidos de aplicar la función sobre el elemento retornado por el selector.


# ToDo
* Continuar con la sección *Instanciación*.
* Comenzar con la sección *Uso*, que especifica cómo los objetos funcionan internamente.