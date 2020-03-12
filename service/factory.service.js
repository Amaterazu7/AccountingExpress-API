const type = require('../model/transaction/type');
const DebitTransaction = require('../service/debitTransaction');
const CreditTransaction = require('../service/creditTransaction');

class FactoryService {
    static createTransaction(transactionType) {
        switch (transactionType) {
            case type.DEBIT:
                return new DebitTransaction();
            case type.CREDIT:
                return new CreditTransaction();
            default:
                throw new Error("Not supported transaction Type, only should be CREDIT or DEBIT.");
        }
    }
}

module.exports = { FactoryService };
