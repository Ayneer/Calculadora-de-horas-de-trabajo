const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const getCredentials = () => {
    const {
        MONGO_HOST,
        MONGO_PORT,
        MONGO_DATABASE,
        MONGO_USER,
        MONGO_PASSWORD,
        MONGO_REPLICASET,
        MONGO_SSL,
        MONGO_AUTH_SOURCE
    } = process.env;

    let replicas = MONGO_HOST.split(',')
        .map(url => `${url}:${MONGO_PORT}`)
        .join(',');

    const MONGO_URL = `mongodb://${replicas}/${MONGO_DATABASE}`;

    return {
        MONGO_URL,
        MONGO_USER,
        MONGO_PASSWORD,
        MONGO_REPLICASET,
        MONGO_SSL,
        MONGO_AUTH_SOURCE
    };
}

const connect = async () => {
    const credentials = getCredentials();
    console.log(`Intentando conectar hacia ${credentials.MONGO_URL}`);
    try {
        await mongoose.connect(credentials.MONGO_URL, {
            user: credentials.MONGO_USER,
            pass: credentials.MONGO_PASSWORD,
            replicaSet: credentials.MONGO_REPLICASET,
            ssl: credentials.MONGO_SSL == '1' ? true : false,
            authSource: credentials.MONGO_AUTH_SOURCE,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log(`Conectado con éxito hacia ${credentials.MONGO_URL}`);
        return true;
    } catch (error) {
        console.info('Error al conectar con Mongodb', error);
        return false;
    }
}

const isConnected = () => {
    return mongoose.connection.readyState === 1 ? true : false;
};

module.exports = {
    getCredentials,
    connect,
    isConnected
};;