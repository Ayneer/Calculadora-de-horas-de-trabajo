const status = require('../../helpers/status');
const repositories = require('../../repositories');

const Find = async condition => await repositories.serviceRepositorie.Find(condition);

const Handler = async (req, res, next) => {
    try {
        const { condition } = req.body;

        const result = await Find(condition);
        res.status(status(result.status)).send(result);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    Find,
    Handler,
}