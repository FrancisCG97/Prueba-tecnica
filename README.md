# ¡Bienvenidos a mi prueba técnica!

En esta oportunidad, desarrollé un Gestor de tareas, en el cual se pueden crear, ver, editar y eliminar tareas dentro de un calendario. Además,
estas tareas pueden filtrarse por prioridad (alta, media y baja), y por estado (pendiente y completada).


### Tecnologías utilizadas:

Para este proyecto, se utilizó:

La interfaz se desarrolló con HTML, JavaScript, React, CSS y Bootstrap.
La API se desarrolló con Python y FastAPI, y se conecta a través de axios con el frontend.
Por último, como base de datos se utilizó un archivo .json para persistencia simple.


### Arquitectura del proyecto:

Backend: Python monolítico, ya que se considera una aplicación pequeña, por lo que no es estrictamente necesario una arquitectura robusta.

Frontend: React como base del proyecto, con componentes separados en carpetas: "components", en donde se encuentran los componentes reutilizables del proyecto, y "pages" en donde están las rutas principales del proyecto, en este caso para visualizar el calendario o la tabla de filtrado.


### Instrucciones para iniciar localmente el proyecto:

Luego de clonar el proyecto, se debe:

1.- Instalar todas las dependencias con el comando `npm install` en el directorio raíz.

2.- Ingresar a la carpeta backend con el comando `cd .\backend\`.

3.- Instalar las dependencias restantes en el backend con `npm install`.

4.- Iniciar el backend con el comando `npm run dev:backend`. 
(¿Quieres saber si está funcionando correctamente?, simplemente ingresa a la ruta del [localhost](http://localhost:8000/tasks))

5.- Ingresar a la carpeta frontend con el comando `cd .\frontend\`.

6.- Instalar las dependencias restantes en el frontend con `npm install`.

7.- Iniciar la interfaz con el comando `npm start`.

8.- ¡Y listo! ¡Ahora puedes utilizar correctamente el Gestor de tareas de forma local!


### Desarrolladora:

Por último, me encantaría agradecer el poder hacer este proyecto, espero nos veamos nuevamente.
¡Hasta pronto!


