const BaseModel = require('./baseModel');
const uuid = require('uuid/v4');


class User extends BaseModel {
    constructor(name = null, surname = null, email = null, id = uuid()) {
        super(id);
        this.name = name;
        this.surname = surname;
        this.email = email;
    }
}

module.exports = User;
