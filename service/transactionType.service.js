const toBeImplemented = () => new Error ('This method must be implemented in the subclass!');

class TransactionTypeService {
    handlerTransaction(request, account) {
        toBeImplemented();
    }

    checkBalance(request, accountBalance) {
        toBeImplemented();
    }
}

module.exports = TransactionTypeService;
