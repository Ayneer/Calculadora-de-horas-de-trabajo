const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

//Middleware para permitir la conexión sin restricciones (Actualizar en producción)
if (process.env.NODE_ENV !== 'production') {
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept',
        );
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });
}

//Sí no estasmos en producción, entonces usamos el .env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: `${path.dirname(__dirname)}/.env` });
}

//Middleware para trabajar las peticiones en Json
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json({ extended: true }));

//Middleware para las rutas
require('./routes')(express, app);

module.exports = app;