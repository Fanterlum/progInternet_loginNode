Vicente Glez
Trabajo 04 crea un sitio con JavaScript

![image](https://github.com/Fanterlum/progInternet_loginNode/assets/73490758/968e7c95-95ba-4e09-8397-709293de6fc5)
![image](https://github.com/Fanterlum/progInternet_loginNode/assets/73490758/2a8b7185-370d-4c9c-8d4b-787aca002d2e)
![image](https://github.com/Fanterlum/progInternet_loginNode/assets/73490758/1833c386-fc22-4a09-86a9-18eef717bf8a)


Carga de Variables de Entorno (dotenv): El código utiliza la biblioteca dotenv para cargar variables de entorno desde un archivo .env. Esto se hace con dotenv.config();.

Obtención del Directorio de la Aplicación (appDirectory): Se utiliza process.cwd() para obtener el directorio de trabajo actual de la aplicación. Esto se almacena en la variable appDirectory y se utiliza para construir rutas de archivos.

Almacenamiento de Datos de Usuarios (userData): La variable userData se utiliza para almacenar datos de los usuarios, en este caso, las horas registradas. Se inicializa como un objeto vacío.

Creación del Servidor HTTP: Se crea un servidor HTTP utilizando el módulo http de Node.js. El servidor escucha en un puerto determinado (predeterminado 3000 o el especificado en las variables de entorno).

Manejo de Rutas: El servidor maneja diferentes rutas, como /login, /service_hours, y /dashboard. Cada una de estas rutas se dirige a una función específica que maneja la lógica relacionada con esa ruta.

Función handleLogin
javascript
Copy code
async function handleLogin(req, res) {
  // Manejo de solicitudes POST para el formulario de inicio de sesión
  if (req.method === 'POST') {
    // Procesamiento de los datos del formulario y autenticación simulada
    // (en este caso, se verifica si el nombre de usuario y la contraseña son correctos)
    // Redirección a la página de dashboard en caso de autenticación exitosa
    // Redirección al formulario de inicio de sesión en caso de credenciales incorrectas
  } else {
    // Manejo de solicitudes GET para el formulario de inicio de sesión
    // Se sirve el formulario de inicio de sesión
  }
}
En esta función, se aplican conceptos como la gestión de solicitudes POST y GET, procesamiento de datos del formulario, y redirección a páginas diferentes según la autenticación.

Función handleServiceHours
javascript
Copy code
async function handleServiceHours(req, res) {
  if (req.method === 'POST') {
    // Manejo de solicitudes POST para el registro de horas de servicio social
    // Procesamiento de datos del formulario y almacenamiento en el objeto `userData`
    // Redirección a la página de registro de horas
  } else {
    // Manejo de solicitudes GET para la página de registro de horas
    // (Código relacionado con la página de registro de horas no está incluido en este fragmento)
  }
}
En esta función, se manejan las solicitudes POST para el registro de horas de servicio social, se procesan los datos del formulario, y se almacenan en la estructura de datos userData.

Función serveDashboardPage
javascript
Copy code
async function serveDashboardPage(res, userId) {
  // Manejo de la página de dashboard
  // Generación de contenido dinámico basado en los datos de horas registradas en `userData`
  // (Código relacionado con la página de dashboard no está incluido en este fragmento)
}
En esta función, se maneja la página de dashboard y se genera contenido dinámico basado en los datos de horas registradas en userData.

Función serveFile
javascript
Copy code
async function serveFile(req, res) {
  // Manejo de solicitudes para servir archivos y contenido estático
  // Determinación del tipo de contenido y lectura de archivos
  // (Código relacionado con la lectura de archivos y determinación del tipo de contenido está incluido en este fragmento)
}
En esta función, se manejan solicitudes para servir archivos y contenido estático, y se determina el tipo de contenido en función de la extensión del archivo.
