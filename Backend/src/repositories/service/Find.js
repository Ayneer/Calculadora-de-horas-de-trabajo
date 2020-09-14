const { responseModel, FOUND_RESOURCE, NO_FOUND_RESOURCE, INTERNAL_ERROR } = require('../../helpers/response');
const model = require('../../models/Service');

//Metodo encargado de buscar un documento de la colección Servicio
//Se utiliza try-catch para capturar algún error inesperado
const Find = async condition => {
    try {
        //Se intenta buscar el documento
        const result = await model.findOne(condition);

        if (result) {//Sí retorna un objeto quiere decir que todo salio de manera exitosa
            return responseModel(false, FOUND_RESOURCE, result, null, FOUND_RESOURCE);
        } else {//Sí no retorna un objeto quiere decir que hubo un error en su proceso
            return responseModel(true, NO_FOUND_RESOURCE, null, NO_FOUND_RESOURCE, NO_FOUND_RESOURCE);
        }

    } catch (error) {
        return responseModel(true, INTERNAL_ERROR, null, error.code, error.message);
    }
}

module.exports = Find;