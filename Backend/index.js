const app = require('./src/app');
const path = require('path');   
const mongodb = require('./src/helpers/mongodb');
const { NODE_ENV = 'desarrollo', PORT = 3600 } = process.env;

//Sí no estasmos en producción, entonces usamos el .env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: `${path.dirname(__dirname)}/.env` });
}

//Realizar conexión con la base de datos
if (!mongodb.isConnected()) {
    mongodb.connect();
}

app.listen(PORT, () => {
    console.log(`Corriendo en ${NODE_ENV} por el puerto ${PORT}, db: ${process.env.MONGO_DATABASE}`);
});