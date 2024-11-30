const express = require("express");
const bodyParser = require('body-parser');
const logger = require("morgan");
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors'); // Importa cors

// Configurar dotenv
dotenv.config();

// Configurar la aplicación Express
const app = express();
let { router } = require('./routes');

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:8100', // Permitir solicitudes desde tu aplicación Ionic
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Cabeceras permitidas
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
