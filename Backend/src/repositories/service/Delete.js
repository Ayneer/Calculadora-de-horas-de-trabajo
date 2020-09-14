const { responseModel, DELETED_RESOURCE, ERROR_DELETE_RESOURCE, NO_FOUND_RESOURCE, INTERNAL_ERROR } = require('../../helpers/response');
const model = require('../../models/Service');

//Metodo encargado de eliminar un documento en la colección Servicio
//Se utiliza try-catch para capturar algún error inesperado
const Delete = async (_id) => {
    try {
        //Se intenta eliminar el documento
        const result = await model.findOneAndDelete({ _id });

        if (result) {//Sí retorna un objeto quiere decir que todo salio de manera exitosa
            return responseModel(false, DELETED_RESOURCE, result, null, DELETED_RESOURCE);
        } else {//Sí no retorna un objeto quiere decir que hubo un error en su proceso
            return responseModel(true, NO_FOUND_RESOURCE, null, NO_FOUND_RESOURCE, ERROR_DELETE_RESOURCE);
        }

    } catch (error) {
        return responseModel(true, INTERNAL_ERROR, null, error.code, error.message);
    }
}

module.exports = Delete;