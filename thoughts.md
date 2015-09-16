# Thoughts

Definimos tres partes generales que constituirían una *augmentation*:

- Selección de los datos target de la augmentation
- Obtención de los datos que conformarán la augmentation
- Augmentar la página a partir de los datos obtenidos

Podemos delegar la realización de estas tareas a tres objetos, cada uno cumpliendo un rol particular:

- Selector
- Obtenedor
- Inyector

Estos dispondrán de una o más formas de realizarlas; por ejemplo, el segundo podría obtener los datos mediante consultas semánticas, parseo de otros documentos web o utilizando APIs de otras aplicaciones web.

Hasta el momento, los comportamientos que identificamos que podrían tener estos objetos son:

##### Selector
Obtención de los datos a partir de un Xpath específico, o a partir de un Xpath parametrizable en caso de ser N datos.

##### Obtenedor
Obtención mediante consultas semánticas, parseo de DOMs de otros documentos web y/o uso de APIs. Decimos *y/o* para admitir una mezcla de estrategias, en caso de necesitarla.

##### Inyector
Análisis y validación de los datos obtenidos y posterior inyección, que puede ser a partir de la modificación de elementos del DOM o mediante la construcción e inserción de un elemento nuevo.