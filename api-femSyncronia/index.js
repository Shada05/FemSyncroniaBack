const express = require("express");
const bodyParser = require('body-parser');
const logger = require("morgan");
const http = require('http');
const dotenv = require('dotenv');

// Set up the express app
const app = express();
let {router} = require('./routes');

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

// Log requests to the console.
app.use(logger('dev'));
const port = parseInt(process.env.API_PORT) || 3001;
app.set('port', port);
const server = http.createServer(app);

app.listen(port, async()=>{
    console.log(`Servidor Corriendo en el puerto ${port}, ${process.env.NODE_ENV}`);
});   

module.exports = app;  
