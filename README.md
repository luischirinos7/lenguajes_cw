Calculadora de Matrices Interactiva

Esta es una aplicación web simple que permite realizar operaciones matematicas con matrices cuadradas, desde 2x2 hasta 10x10. El proyecto está construido desde cero utilizando HTML, CSS y JavaScript.

Como Empezar (Uso Local)

Sigue estos pasos para clonar y ejecutar el proyecto en tu equipo local.

1. Clona el repositorio:
Abre tu terminal o consola de Git y ejecuta el siguiente comando. 

git clone https://github.com/luischirinos7/lenguajes_cw

2. Navega a la carpeta:
Una vez clonado, entra en la carpeta del proyecto.

En caso de entrar por la terminal:
cd lenguajes_cw

Para entrar desde el explorador, solo busca el directorio en el que lo guardaste.

3. Abre el archivo principal:

Haz doble clic en el archivo index.html para abrirlo en tu navegador web predeterminado.

Funcionalidades y Guía de Uso

La aplicación se divide en tres secciones principales: Controles, Operaciones y Resultado.

1. Controles y Entrada de Datos

En la parte superior, puedes configurar las matrices de entrada:

Selectores de Tamaño: Elige el tamaño (N) para la Matriz A y la Matriz B, desde 2x2 hasta 10x10.

Generar Rejillas: Este botón actualiza la interfaz para crear las celdas de entrada según los tamaños seleccionados.

Valores Aleatorios: Rellena ambas matrices con números enteros aleatorios (entre -9 y 9) para pruebas rápidas.

Cargar Ejemplo (3x3): Carga dos matrices 3x3 predefinidas. Esta funcion solo se activa si ambas matrices están configuradas en 3x3.

Entrada Manual: Puedes escribir cualquier valor numérico directamente en las celdas de la Matriz A y Matriz B.

2. Sección de Operaciones

Una vez que tengas tus matrices, puedes usar los botones de operación:

Operaciones entre dos matrices (A y B):

A + B: Suma de matrices.

A - B: Resta de matrices.

A * B: Multiplicación de matrices.

Nota: Las matrices deben ser del mismo tamaño para estas operaciones (según los requisitos del proyecto).

Operaciones con una matriz (Matriz A):

Transpuesta (A): Calcula la matriz transpuesta de A.

Determinante (A): Calcula el determinante de A. El resultado se muestra como un solo número en el área de mensajes.

Inversa (A): Calcula la matriz inversa de A.

Identidad (para A): Genera una matriz identidad del mismo tamaño que A.

Operaciones con Escalar:

A * Escalar / B * Escalar: Multiplica la matriz seleccionada por el número en el campo "Escalar".

3. Área de Resultado

Resultado: La matriz resultante de cualquier operación se mostrará en esta área. Las celdas son de solo lectura y están en color gris.

Mensajes de Error: Si una operación no es válida (por ejemplo, intentar invertir una matriz con determinante 0), se mostrará un mensaje de error claro en esta sección.
