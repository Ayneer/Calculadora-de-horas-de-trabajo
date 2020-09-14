const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ServiceSchema = new schema({
    idTec: { type: String, required: [true, 'Es requerido'] },
    idSer: { type: String, required: [true, 'Es requerido'] },
    startDate: { type: Date, required: [true, 'Es requerido'] },
    startTime: { type: Date, required: [true, 'Es requerido'] },
    endDate: { type: Date, required: [true, 'Es requerido'] },
    endTime: { type: Date, required: [true, 'Es requerido'] },
}, {
    timestamps: true
});

const Servicios = mongoose.model('Servicios', ServiceSchema);

module.exports = Servicios;