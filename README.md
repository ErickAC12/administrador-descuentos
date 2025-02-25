# Administrador de descuentos
Página para modificar precios aplicando descuentos a productos seleccionados según los usuarios elegidos por el administrador. La identificación del usuario se utiliza para determinar a quiénes se les aplicará el descuento. El producto también cuenta con un identificador para saber a qué se le aplicará el descuento. Es posible iniciar sesión con un usuario y mantener la sesión abierta gracias a una cookie.

# Como ejecutar e instalar
Crear un archivo .env en la carpeta de backend con este formato:
```http
"MONGO_URI=<link>/tienda"
```

Abrir 2 consolas, una en la carpeta frontend y otra en la carpeta backend, en ambas consolas hacer:
```bash
npm i
npm run dev
```

# Frontend
El frontend está hecho con React y Typescript, el uso de Typescript ayuda a que sea más preciso saber los tipos de datos y evitar
errores que tengan que ver con tipos de datos no compatibles. Facilita también la comprensión de el código al limitar lo que se
puede utilizar dentro del código y suele ser más seguro al avisar de errores antes de ejecución.

Dentro de ```frontend/src/``` están todos los componentes que crean la página:

- ```components/``` tiene la navbar que siempre está presente sin importar el link. 

- ```context/``` incluye el contexto para mantener información como el nombre de usuario, o ID para ser usada al subir precios.

- ```interfaces/``` tiene plantillas para organizar información obtenida o mandada al backend.

- ```pages/``` son las páginas que se usan en cada link.

- ```styles/``` son los estilos guardados en archivos ```.css```.

# Backend
El backend está hecho en NodeJS con Express, que suelen ser buena opción para un backend simple ya que la estructura de cada entrada suele ser similar y explicativa, además de escalable.

La base de datos MongoDB con la librería de Mongoose también ayuda a crear schemas con las que se pueden definir cómo está organizado los elementos de una colección y con ello poder consultarlo para la creación o edición de estos en la base de datos.

Dentro de ```backend/``` están los archivos que crean el backend:

- ```controllers/``` son las funciones utilizadas en ```server.js``` para las entradas de la API.

- ```db/``` tiene las funciones que conectan con la base de datos MongoDB.

- ```models/``` incluye los modelos de mongoose para creación y búsqueda de información de la base de datos.

- ```config.js``` contiene constantes como ```PORT``` y ```TOKEN_SECRET```, que normalmente sería mejor mantener en el archivo ```.env```, pero por propósitos demostrativos mantuve públicos para más fácil ejecución local.

- ```server.js``` tiene todas las direcciones de las entradas a la API para interactuar con la base de datos.
