const { Create, Handler: CreateHandler } = require("./Create");
const { List, Handler: ListHandler } = require("./List");
const { Delete, Handler: DeleteHandler } = require("./Delete");
const { Edit, Handler: EditHandler } = require("./Edit");
const { Find, Handler: FindHandler } = require("./Find");
const { Handler: GetCombinationsHandler } = require("./GetCombinations");

module.exports = {
    Create,
    CreateHandler,
    List,
    ListHandler,
    Delete,
    DeleteHandler,
    Edit,
    EditHandler,
    Find,
    FindHandler,
    GetCombinationsHandler
}