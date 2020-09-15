const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

//Conectarse a la in-memory base de datos
const connect = async () => {
    const uri = await mongod.getUri();
    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
    };
    await mongoose.connect(uri, mongooseOpts);
}

//Se borra la base de datos, se cierra la conexió y se detiene mongod
const closeDataBase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

//Se borran todas las coleccines
const clearDataBase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}

module.exports = {
    connect,
    closeDataBase,
    clearDataBase
}