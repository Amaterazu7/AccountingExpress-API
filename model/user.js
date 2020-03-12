const BaseModel = require('./baseModel');
const Util = require('../service/util.service');

class User extends BaseModel {
    constructor(name = null, surname = null, email = null, codeId = Util.randomCode(Util.min(), Util.max())) {
        super();
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.codeId = codeId;
    }
}

module.exports = User;
