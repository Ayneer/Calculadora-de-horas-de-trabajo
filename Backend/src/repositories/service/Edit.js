const { responseModel, EDITED_RESOURCE, NO_FOUND_RESOURCE, INTERNAL_ERROR } = require('../../helpers/response');
const model = require('../../models/Service');

//Metodo encargado de editar un documento de la colección Servicio
//Se utiliza try-catch para capturar algún error inesperado
const Edit = async (_id, payload) => {
    try {
        //Se intenta buscar y editar el documento
        const result = await model.findOneAndUpdate({ _id }, payload, { new: true });

        if (result) {//Sí retorna un objeto quiere decir que todo salio de manera exitosa
            return responseModel(false, EDITED_RESOURCE, result, null, EDITED_RESOURCE);
        } else {//Sí no retorna un objeto quiere decir que hubo un error en su proceso
            return responseModel(true, NO_FOUND_RESOURCE, null, NO_FOUND_RESOURCE, NO_FOUND_RESOURCE + " Y NO SE LOGRÓ SU EDICIÓN.");
        }

    } catch (error) {
        return responseModel(true, INTERNAL_ERROR, null, error.code, error.message);
    }
}

module.exports = Edit;