# Getter objects
A continuación se exponen los datos que cada objeto necesita recibir para funcionar

### **Soundtrack**
* **imdbSongsList**: dada una URL, parsea su DOM y retorna los elementos en un formato entendible. Dicha URL tiene una parte fija y una variable, siendo esta última la correspondiente a la película en cuestión.
  * *Entrada*: id de la película. Es una parte de la URL a parsear.
* **youtubeVideoLink**: dada una URL, parsea su DOM y retorna un link a un video de *youtube*. La URL tiene una parte fija y una variable, siendo la última el string sobre el que se tiene que efectuar la búsqueda.
  * *Entrada*: string que se debe añadir a la URL de búsqueda.
* **dbpediaMusicComposers**: se efectúa una consulta SPARQL. Se conocen la mayoría de las variables, hace falta el nombre de la película.
  * *Entrada*: nombre de la película sobre la que se quieren obtener datos.
* **youtubeVideosList**: dada una API, se recibe el string sobre el que se quieren efectuar las búsquedas, se hace una petición a la API y se retorna la URL de la lista.
  * *Entrada*: string de búsqueda que se pasará a la API.

### **Locations**
* **filmingLocations**: URL semicompleta, se completa con el id de la película. Parseo de DOM, devolución de datos formateados como dios manda.
  * *Entrada*: id de la película.
* **imageUrl**: se tiene una consulta SPARQL a la que se le agrega, como una de las variables, el nombre de la *location* recibido como parámetro.
  * *Entrada*: nombre de una location.

### **Morbo**
* **birthAndDeathDates**: se tiene una serie de consultas SPARQL. La primera que se efectúa requiere que se le indique el nombre de un actor. Las siguientes dependen del resultado de esta.
  * *Entrada*: nombre de un actor.

Surge una duda en la augmentation de *Morbo*: si bien tenemos una sola función que obtiene todos los datos, hay tres consultas SPARQL, por lo que se podría ver como tres objetos getter, dependientes entre ellos. A mi criterio, se genera un solo resultado palpable desde el punto de vista del que invoca, por lo que deberían ser parte de un mismo objeto getter. **Se concluyó que en el momento estábamos muy poco pillos con javascript y ya que andaba lo fuimos copiando, pegando y anidando**.

# Pensamientos finales
Vemos que hay tres tipos bien definidos de objetos *getter*. Cada uno tiene ciertas características.

* DomParser
  * Conoce (los datos que serán iguales para todas las *invocaciones* del objeto):
    * Una parte de la URL; la parte fija
    * Lo que tiene que hacer con el DOM
  * Necesita (datos que dependen de una cierta invocación):
    * La parte faltante de la URL
* SemanticQuerier (EXITO)
  * Conoce:
    * La mayoría de las variables a usar en la consulta SPARQL
    * El motor semántico sobre el que se va a consultar
  * Necesita: una/s cierta/s variable/s
* ApiCaller
  * Conoce:
    * La API
    * El método que invocará
  * Necesita:
    * Los parámetros para el método

### Aclaración sobre *conoce* y *necesita*
##### Conoce
Nos referimos a los datos con los que se inicializa el objeto. Aquellos que serán "fijos" para un mismo objeto. Por ejemplo, en locationsGetter, la parte fija de la URL `http://imdb.com/*/locations` y el bloque con las instrucciones a ejecutar sobre cada DOM obtenido.
##### Necesita
Nos referimos a los datos que son propios de cada *llamado* al getter. Por ejemplo, en locationsGetter, el id de la película, que se insertará en donde pusimos un * en la url fija.
