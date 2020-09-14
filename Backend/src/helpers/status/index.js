const { CREATED_RESOURCE, FOUND_RESOURCE, EDITED_RESOURCE, DELETED_RESOURCE, GETS_RESOURCE, INTERNAL_ERROR, NO_FOUND_RESOURCE } = require("../response");

module.exports = status => {
    switch (status) {

        case CREATED_RESOURCE: {
            return 201;
        }

        case FOUND_RESOURCE:
        case EDITED_RESOURCE:
        case DELETED_RESOURCE:
        case GETS_RESOURCE: {
            return 200;
        }

        case INTERNAL_ERROR: {
            return 500;
        }
        
        case NO_FOUND_RESOURCE:{
            return 400;
        }

        default: {
            return 404;
        }
    }
}