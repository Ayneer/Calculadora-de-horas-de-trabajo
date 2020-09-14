const status = require('../../helpers/status');
const repositories = require('../../repositories');
const { responseModel, ERROR_CREATE_RESOURCE } = require('../../helpers/response');
const moment = require('moment');
const { Find } = require('./Find');

const Create = async Service => await repositories.serviceRepositorie.Create(Service);

const Handler = async (req, res, next) => {
    try {
        const { idTec, idSer, startDate, startTime, endDate, endTime } = req.body;

        //Se validan los datos entrantes del servico
        if (idTec && idSer && moment(startDate).isValid() && moment(startTime).isValid() && moment(endDate).isValid() && moment(endTime).isValid()) {

            //Validamos las fechas
            if (moment(startDate).isSameOrBefore(moment(endDate)) && moment(startTime).isSameOrBefore(moment(endTime))) {

                //Buscar el ultimo servicio del tecnico y verificar que coincida con las fechas enviadas
                const endService = await repositories.serviceRepositorie.FindAndSort({ idTec }, { "endTime": -1 });
                if (endService.data) {

                    //El nuevo servicio debe empezar despues del ultimo realizado
                    if (moment(startTime).isAfter(moment(endService.data.endTime))) {
                        const result = await Create({ idTec, idSer, startDate, startTime, endDate, endTime });
                        res.status(status(result.status)).send(result);
                    } else {
                        res.status(status(ERROR_CREATE_RESOURCE)).send(responseModel(true, ERROR_CREATE_RESOURCE, null, ERROR_CREATE_RESOURCE, `${ERROR_CREATE_RESOURCE}". EL SERVICIO QUE INTENTA AGREGAR FUE REALIZADO ANTES QUE EL ULTIMO REGISTRADO (${moment(endService.data.endTime)}), VERIFIQUE E INTENTE NUEVAMENTE.`));
                    }

                } else if (!endService.data) {//No tiene datos aún
                    const result = await Create({ idTec, idSer, startDate, startTime, endDate, endTime });
                    res.status(status(result.status)).send(result);
                }

            } else {
                res.status(status(ERROR_CREATE_RESOURCE)).send(responseModel(true, ERROR_CREATE_RESOURCE, null, ERROR_CREATE_RESOURCE, ERROR_CREATE_RESOURCE + ". EL ORDEN DE LAS FECHAS NO CONCUERDA, REVISE E INTENTE NUEVAMENTE."));
            }

        } else {
            res.status(status(ERROR_CREATE_RESOURCE)).send(responseModel(true, ERROR_CREATE_RESOURCE, null, ERROR_CREATE_RESOURCE, ERROR_CREATE_RESOURCE + ". FALTAN DATOS REQUERIDOS, REVISE E INTENTE NUEVAMENTE."));
        }


    } catch (error) {
        next(error);
    }
}

module.exports = {
    Create,
    Handler,
}