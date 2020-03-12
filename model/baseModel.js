const uuid = require('uuid/v4');

class BaseModel {
    constructor(id = uuid(), creationDate = new Date(), modificationDate = new Date()) {
        this.id = id;
        this.creationDate = creationDate;
        this.modificationDate = modificationDate;
    }
}

module.exports = BaseModel;
