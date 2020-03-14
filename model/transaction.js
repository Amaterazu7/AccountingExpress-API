const BaseModel = require('./baseModel');

class Transaction extends BaseModel {
    constructor(amount = null, type = "", status = "", description = "", account = null) {
        super();
        this.amount = amount;
        this.type = type;
        this.status = status;
        this.description = description;
        this.account = account;
    }
}

module.exports = Transaction;
