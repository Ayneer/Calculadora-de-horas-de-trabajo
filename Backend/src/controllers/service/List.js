const status = require('../../helpers/status');
const repositories = require('../../repositories');

const List = async condition => await repositories.serviceRepositorie.List(condition);

const Handler = async (req, res, next) => {
    try {
        const { condition } = req.body;

        const result = await List(condition);
        res.status(status(result.status)).send(result);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    List,
    Handler,
}