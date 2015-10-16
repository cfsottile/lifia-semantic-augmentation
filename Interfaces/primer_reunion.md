### ¿En qué consistiría una *augmentation*?

* Un **selector** inicial que, dado un xpath, retorna un elemento del DOM.
	* Escribiendo un pseudocódigo para el *carousel* encuentro que el **selector** no me daría un elemento del DOM, sino una URL, y el parámetro que necesitaría sería el id de la película, extraible desde el DOM o sus metadatos.
	* Cuestión, el selector puede recibir un xpath y retornar un elemento del DOM, o puede recibir un string y retornar una URL (el string sería una parte de la URL devuelta), o bien la url completa y listo.
* Un **buscador** que, a partir del elemento del DOM retornado por el **selector** inicial, retorna la información *adicional*.
	* Otro **buscador** que, a partir de la salida del **buscador** anterior, retorna otra información adicional. N veces.
* Un **constructor** que toma la información adicional del último **buscador** y le da formato.
* Un **selector** final que, dado un xpath, retorna un elemento del DOM.
* Un **inyector** que toma la información formateada del **constructor** y el elemento del DOM retornado por el **selector** final.

### Selector

Definimos un principio de interfaz para el objeto *Selector*. Planteamos los métodos mediante los cuales lo configuraremos y los que usaríamos para interactuar con él:

* **Configuración**
	* *seteo de* dos strings correspondientes a las partes fijas del Xpath o la URL.
	* *seteo de* la función a aplicar sobre el elemento obtenido.
* **Interacción**
	* *obtención* del elemento pasado por la función de parseo.
	* *obtención* del elemento crudo.

### ¿Cómo se vería una augmentación?

En un principio, yo había pensado algo así como subclasificar Augmentation para una página en particular, definiendo en el initialize la *configuración* de los objetos.

```ruby
# Ejemplo para la augmentation de locations de IMDb
# Simplificación a UNA sola location

# Se recibieron como parámetros 

def initialize
	selector_inicial = SelectorUrl.new(
		SELECTOR_MODE_BETWEEN,
		["imdb.com/title/", "/locations"],
		parse_function)
	location = selector
```

Pero no tiene mucho sentido, así que pasamos al siguiente enfoque:

```ruby
aug = Augmentation.new(
	SelectorUrl.new(
		SELECTOR_MODE_BETWEEN,
		["imdb.com/title/", "/locations"],
		parse_function
	),
	[
		Getter.new(

		),
		Getter.new(

		)
	],
	Builder.new(
	
	),
	SelectorXpath.new(

	),
	Injector.new(

	)
)

aug.run(dom.movie_id)
```

### Pensamientos sobre el seteo del Xpath/URL

SelectorXpath
	new modo, xpath[]
		* modo: la parte variable del xpath se encuentra al principio, en el medio o al final. Por defecto en el medio.
		* xpath[]: se recibe el xpath separado en las partes fijas. Por ejemplo: ["div/div/", "/div/div"], donde entre medio de los divs se debe insertar el identificador de la augmentación particular

SelectorUrl
	new modo, url[]

Para simplificar, por el momento nos quedamos con que el modo es siempre el del medio y el array tiene solo dos partes