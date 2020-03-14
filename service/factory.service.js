const DebitTransaction = require('../service/debitTransaction');
const CreditTransaction = require('../service/creditTransaction');
const Mapper = require('../model/mapper');

class FactoryService {
    static createTransaction(transactionType) {

        switch (transactionType) {
            case Mapper.payment().get(0):
                return new CreditTransaction();
            case Mapper.payment().get(1):
                return new DebitTransaction();

            default:
                throw new Error("Not supported transaction Type, only should be CREDIT or DEBIT.");
        }
    }
}

module.exports = FactoryService;
