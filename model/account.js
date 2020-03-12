const BaseModel = require('./baseModel');

class Account extends BaseModel {
    constructor(totalAmount = null, user = null, accountTransactions = null, version = null) {
        super();
        this.totalAmount = totalAmount;
        this.user = user;
        this.accountTransactions = accountTransactions; // List<Transaction>
        this.version = version;
    }

}

module.exports = Account;
