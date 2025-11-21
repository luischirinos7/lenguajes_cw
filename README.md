# Trivia Game

Esta es una aplicación web que permite jugar partidas de preguntas y respuestas usando la API pública OpenTDB, con opción de traducción automática al español mediante MyMemory API. El proyecto está construido completamente con HTML, CSS y JavaScript.

---

## 🚀 Cómo Empezar (Uso Local)

Sigue estos pasos para clonar y ejecutar el proyecto en tu equipo:

### 1. Clona el repositorio

Abre tu terminal o Git Bash y ejecuta:

```
git clone https://github.com/luischirinos7/tu_repositorio
```

Asegúrate de reemplazar el enlace con el URL real de tu repo.

### 2. Entra en la carpeta del proyecto

Si estás en la terminal:

```
cd tu_repositorio
```

Si estás desde el explorador de archivos, simplemente entra al directorio donde lo guardaste.

### 3. Abre el archivo principal

Haz doble clic sobre **index.html** para abrir la aplicación en tu navegador.

---

## 🎮 Funcionalidades y Guía de Uso

La aplicación está dividida en **tres secciones principales**: Configuración, Partida y Resultados.

---

## 1. Configuración Inicial

Aquí puedes establecer cómo será tu partida:

### ✏️ Datos del Jugador

* Escribe tu nombre (entre 2 y 20 caracteres).

### 🔢 Número de Preguntas

* Selecciona entre **5 y 20 preguntas**.

### 🎯 Dificultad

* Fácil
* Media
* Difícil
* Aleatoria (si dejas el campo en blanco)

### 📚 Categoría

Puedes elegir categorías específicas como:

* Conocimientos generales
* Historia
* Deportes
* Arte
* Videojuegos
* Entre muchas otras.

Si lo dejas vacío, recibirás preguntas mixtas.

### 🌐 Traducir Preguntas

Activa o desactiva la opción **"Traducir al español"**.
Usa la API de MyMemory para traducir preguntas y respuestas del inglés al español.

### ▶️ Iniciar Partida

Cuando completes todo, presiona **Iniciar Partida** para comenzar.

---

## 2. Durante la Partida

### ⏱️ Temporizador

Cada pregunta tiene **20 segundos** para responder.
Si el tiempo se agota, se cuenta como incorrecta.

### ❓ Preguntas y Opciones

* Las opciones se mezclan automáticamente.
* Puedes ver tu progreso: *Pregunta X de Y*.

### ⭐ Puntuación

* +10 puntos por cada acierto.
* Se muestra el total de correctas, incorrectas y puntaje actual.

### 🔄 Avance Automático

Después de contestar, la aplicación avanza sola a la siguiente pregunta.

---

## 3. Resultados Finales

Al terminar la partida verás:

* Nombre del jugador
* Puntaje total
* Preguntas correctas y totales
* Porcentaje de acierto
* Tiempo total empleado
* Tiempo promedio por pregunta

### 🔁 Opciones finales

* **Jugar de nuevo con la misma configuración**
* **Volver al menú de configuración**
* **Finalizar partida**

---

## 🧩 Tecnologías Utilizadas

* **HTML5**: Maquetación general
* **CSS3**: Estilos responsivos, animaciones y diseño moderno
* **JavaScript puro**: Lógica del juego, consumo de APIs, navegación entre vistas
* **OpenTDB API**: Base de datos de preguntas
* **MyMemory API**: Traducción automática al español

---

## 📁 Estructura del Proyecto

```
📦 proyecto
├── index.html      → Interfaz principal del juego
├── style.css       → Estilos visuales
└── script.js       → Lógica completa del trivia
```

---

## 📝 Notas Importantes

* El proyecto no necesita servidores: funciona con doble clic.
* La API gratuita de MyMemory tiene límites; si se exceden, la traducción puede fallar.
* El avance es completamente automático: no hay botón “Siguiente”.

---

## 💡 Ideal Para

* Prácticas universitarias
* Estudiantes aprendiendo JavaScript
* Proyectos web ligeros sin dependencias externas
* Juegos simples para presentaciones o exposiciones

---

Si quieres agregar nuevas funciones, ¡adelante! El proyecto está pensado para ser fácil de entender y extender.
