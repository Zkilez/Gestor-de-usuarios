const bodyParser = require('body-parser'); // Body-parser permite manejar datos de solicitudes HTTP. Express tiene su propio middleware.

const { layout } = require('ejs-mate'); // Se usa para ejecutar la plantilla que permite incrustar código JavaScript dentro de HTML para generar páginas dinámicas.

const express = require('express'); // Llama al Framework Express para crear el servidor wed

const puerto= express(); // Renombrado para mayor claridad
//
const exphbs = require('express-handlebars'); // Motor de plantillas para formularios con Handlebars para Express.

const path = require('path'); // Módulo de Node.js para manejar y transformar rutas de archivos y directorios.

require('./database'); // Configuración del puerto

puerto.set('escuchar', 5000); // Definición del puerto por donde se ingresa al servidor

puerto.use(express.json()); // Maneja las solicitudes JSON.

puerto.use(bodyParser.json());//formato de texto
puerto.use(bodyParser.urlencoded({ extended: true })); // Maneja datos enviados desde formularios HTML.

puerto.set('views', path.join(__dirname, 'vistas')); // Establece la ruta de la carpeta de vistas donde estarán los archivos de plantillas Handlebars.

puerto.engine(
    "hbs",//procesador de plantillas.
    exphbs.engine({
        extname: "hbs", // Define la extensión de los archivos de plantilla.

        defaultLayout: false, // No usa un diseño predeterminado.

        layoutDir: "views/layouts/" // Directorio donde están los layouts de las vistas.
    })
);

puerto.set('view engine', '.hbs'); // Define Handlebars como el motor de vistas con la extensión ".hbs".
//son dos clases de puerto fisicos(de la maquina) y logicos(de la red)
//->para difinir una funcion

puerto.listen(puerto.get('escuchar'), () => {//Escuchar es una variable que contiene el nombre del puerto.
    console.log('Servidor conectado en el puerto', puerto.get('escuchar'));
}); // Inicia el servidor en el puerto especificado.

puerto.use(require('./rutas/index')); // Importa y usa las rutas definidas en el archivo index.js dentro de la carpeta rutas.
 