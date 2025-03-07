const express = require("express");
const bodyParser = require('body-parser');
const logger = require("morgan");
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors'); // Importa cors
const multer = require('multer');
const storage = multer.memoryStorage(); // Almacena en memoria
const upload = multer({ storage: storage });


/*app.post('/api/upload', (req, res) => {
    console.log(req.body);
    console.log(req.files);
    res.send('Archivo recibido');
});*/
// Configurar dotenv
dotenv.config();

// Configurar la aplicación Express
const app = express();
let { router } = require('./routes');

// Lista de orígenes permitidos
const allowedOrigins = [
    'http://localhost:8100', // Desarrollo con Ionic serve
    'capacitor://localhost', // Origen en Android
    'http://localhost',      // Origen en iOS
];

// Configurar CORS
app.use(cors({
    origin: function (origin, callback) {
        // Permitir solicitudes sin origen (como aplicaciones móviles o Postman)
        if (!origin) return callback(null, true);

        // Verificar si el origen está en la lista de permitidos
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Origen no permitido por CORS'));
        }
    },
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Cabeceras permitidas
    credentials: true, // Permitir credenciales (cookies, tokens, etc.)
}));

// Configurar Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Registrar las rutas
app.use(router);

// Log de solicitudes
app.use(logger('dev'));

// Configurar el servidor y puerto
const port = parseInt(process.env.API_PORT) || 3000;
app.set('port', port);
const server = http.createServer(app);

// Iniciar el servidor
app.listen(port, async () => {
    console.log(`Servidor Corriendo en el puerto ${port}, ${process.env.NODE_ENV}`);
    console.log('Aquí se encuentra el server');
});

module.exports = app;
