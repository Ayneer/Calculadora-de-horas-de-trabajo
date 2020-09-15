const { connect, clearDataBase, closeDataBase } = require('./helper');
const moment = require('moment');
const cService = require('../controllers/service');

//Antes de las pruebas, iniciaremos la base de datos in-memory
beforeAll(async () => await connect());

//Para cada nuevo test, limpiamos las colecciones
afterEach(async () => await clearDataBase());

// Luego de ejecutar las pruebas, se cierra el servicio de la base de datos in-memory
afterAll(async () => await closeDataBase());

describe('Pruebas sobre la coleccion Service', () => {

    const fakeService = {
        idTec: "1143402098",
        idSer: "1122",
        startDate: moment('2020-09-14T00:00'),
        startTime: moment('2020-09-14T14:00'),
        endDate: moment('2020-09-14T00:00'),
        endTime: moment('2020-09-14T16:00')
    }

    const fakeService_2 = {
        idSer: "1122",
        startDate: moment('2020-09-14T00:00'),
        startTime: moment('2020-09-14T14:00'),
        endDate: moment('2020-09-14T00:00'),
        endTime: moment('2020-09-14T16:00')
    }

    it('Debe crear el servicio de forma correcta, sin errores', async () => {
        await expect(async () => await cService.Create(fakeService) ).not.toThrow();
    })

    it('Debe fallar en la creación del servicio, por falta del idTec', async () => {
        const res = await cService.Create(fakeService_2);
        await expect(res.error).toBe(true);
    })

})