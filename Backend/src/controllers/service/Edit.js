const status = require('../../helpers/status');
const repositories = require('../../repositories');

const Edit = async (id, payload) => await repositories.serviceRepositorie.Edit(id, payload);

const Handler = async (req, res, next) => {
    try {
        const { payload } = req.body;
        const { id } = req.params;

        const result = await Edit(id, payload);
        res.status(status(result.status)).send(result);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    Edit,
    Handler,
}