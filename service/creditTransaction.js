const TransactionType = require('./transactionType.service');
const Transaction = require('../model/transaction');
const Mapper = require('../model/mapper');

class CreditTransaction extends TransactionType {
    handlerTransaction(request, account) {
        let creditTransaction = new Transaction();

        if ( this.checkBalance(request, account.totalAmount) ) {
            account.totalAmount = ( account.totalAmount + request.amount );
            creditTransaction.status = ( Mapper.status().get(1) );
            creditTransaction.description = ( "Credit Transaction created Successfully." );
        } else {
            creditTransaction.status = ( Mapper.status().get(2) );
            creditTransaction.description = ( "Could't create a Credit Transaction." );
        }

        creditTransaction.amount = ( request.amount );
        creditTransaction.type = ( request.type );
        creditTransaction.account = ( account );

        return creditTransaction;
    };

    checkBalance(request, accountBalance) {
        return ( request.amount>0 );
    }
}

module.exports = CreditTransaction;
