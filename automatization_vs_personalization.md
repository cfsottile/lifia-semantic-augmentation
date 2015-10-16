# ¿Qué hicimos?
* Armamos una jerarquía de **Getters**. [getters]()
* Replanteamos la interfaz de **Selector**. [selector]()

# Para debatir
### Automatización vs Personalización
Tenemos dos corrientes de pensamiento en cuanto a la arquitectura de una augmentation: una es priorizar la automatización, y la otra es priorizar la presonalización.

En la automatización, se plantea que la instanciación de una augmentation sólo requiera que se le den un conjunto de objetos inicializados; luego ella sabrá cómo *hacerlos interactuar* (en realidad, sería cómo interactuar con ellos, pero ya que la salida de uno es la entrada del siguiente, lo ponemos así).

En la personalización, se plantea que la instanciación de una augmentation se componga de los objetos medianamente inicializados, y de ciertas directivas para definir la interacción. O sea, en la automatización, los objetos están listos para la entrada de uno sea la salida de otro, y en la personalización, hay que especificar cómo funcionará esa interacción.
