const status = require('../../helpers/status');
const repositories = require('../../repositories');

const Delete = async id => await repositories.serviceRepositorie.Delete(id);

const Handler = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await Delete(id);
        res.status(status(result.status)).send(result);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    Delete,
    Handler,
}