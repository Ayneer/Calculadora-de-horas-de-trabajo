const { responseModel, CREATED_RESOURCE, ERROR_CREATE_RESOURCE, INTERNAL_ERROR } = require('../../helpers/response');
const model = require('../../models/Service');

//Metodo encargado de crear un documento en la colección Servicio
//Se utiliza try-catch para capturar algún error inesperado
const Create = async Service => {
    try {
        //Se intenta crear el documento
        const result = await model.create(Service);

        if (result) {//Sí retorna un objeto quiere decir que todo salio de manera exitosa
            return responseModel(false, CREATED_RESOURCE, result, null, CREATED_RESOURCE);
        } else {//Sí no retorna un objeto quiere decir que hubo un error en su proceso
            return responseModel(true, ERROR_CREATE_RESOURCE, null, ERROR_CREATE_RESOURCE, ERROR_CREATE_RESOURCE);
        }

    } catch (error) {
        return responseModel(true, INTERNAL_ERROR, null, error.code, error.message);
    }
}

module.exports = Create;