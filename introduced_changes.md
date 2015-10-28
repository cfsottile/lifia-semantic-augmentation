# Cambios introducidos
El objeto **selector** fue dividido en dos objetos: el **extractor** y el **selector**. El **selector** obtiene un elemento del DOM, mientras que el **extractor** extrae del mismo la info relevante. La clase **Selector** también es utilizada por la clase **Injector** para obtener elementos del DOM. Con este esquema, la clase **Selector** es la encargada de interactuar directamente con el DOM, sirviendo de *helper* a las clases **Extractor** e **Injector**.

Por el momento, ya que no se analizó en profundidad la clase **Builder** y la posible explosión de su jerarquía, la misma será instanciada recibiendo un string que determinará el comportamiento que adoptará la instancia, de forma que sea transparente al usuario.

Nos inclinamos por el enfoque de "caja negra", en el que, al momento de instanciar una augmentation, se le pasan como argumento los objetos que deberá utilizar. La clase augmentation sabe cómo *enchufar* y hacer uso de dichos objetos.