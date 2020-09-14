const controllers = require("../../controllers");

module.exports = express => {
    const routes = express.Router();
    routes.post('/', controllers.serviceController.CreateHandler);
    routes.get('/gets', controllers.serviceController.ListHandler);
    routes.delete('/:id', controllers.serviceController.DeleteHandler);
    routes.put('/:id', controllers.serviceController.EditHandler);
    routes.get('/get', controllers.serviceController.FindHandler);
    routes.post('/combinatios', controllers.serviceController.GetCombinationsHandler);

    return routes;
}