class Transaction {
    constructor(amount = null, type = "", status = "", description = "", account = null) {
        this.amount = amount;
        this.type = type;
        this.status = status;
        this.description = description;
        this.account = account;
    }
}

module.exports = Transaction;
