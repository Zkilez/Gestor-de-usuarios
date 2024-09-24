const bodyParser = require('body-parser'); // Body-parser permite manejar datos de solicitudes HTTP.
const express = require('express'); // Llama al Framework Express para crear el servidor web.
const exphbs = require('express-handlebars'); // Motor de plantillas para formularios con Handlebars para Express.
const path = require('path'); // Módulo de Node.js para manejar y transformar rutas de archivos y directorios.

require('./database'); // Configuración de la base de datos

const puerto = express(); // Renombrado para mayor claridad

puerto.set('escuchar', 5000); // Definición del puerto por donde se ingresa al servidor

puerto.use(express.json()); // Maneja las solicitudes JSON.
puerto.use(bodyParser.json()); // Formato de texto
puerto.use(bodyParser.urlencoded({ extended: true })); // Maneja datos enviados desde formularios HTML.

puerto.set('views', path.join(__dirname, 'vistas')); // Establece la ruta de la carpeta de vistas donde estarán los archivos de plantillas Handlebars.

puerto.engine(
    "hbs", // Procesador de plantillas.
    exphbs.engine({
        extname: "hbs", // Define la extensión de los archivos de plantilla.
        defaultLayout: false, // No usa un diseño predeterminado.
        layoutsDir: path.join(__dirname, 'vistas/layouts'), // Directorio donde están los layouts de las vistas.
        runtimeOptions: {
            allowProtoPropertiesByDefault: true, // Permite acceder a propiedades no propias
            allowProtoMethodsByDefault: true // Permite acceder a métodos no propios
        }
    })
);

puerto.set('view engine', 'hbs'); // Define Handlebars como el motor de vistas con la extensión ".hbs".

puerto.listen(puerto.get('escuchar'), () => { // Escuchar es una variable que contiene el nombre del puerto.
    console.log('Servidor conectado en el puerto', puerto.get('escuchar'));
}); // Inicia el servidor en el puerto especificado.

puerto.use(require('./rutas/index')); // Importa y usa las rutas definidas en el archivo index.js dentro de la carpeta rutas.
