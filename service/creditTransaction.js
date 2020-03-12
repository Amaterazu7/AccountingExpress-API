const TransactionType = require('./transactionType.service');
const Transaction = require('../model/transaction/transaction');
const status = require('../model/transaction/status');

class CreditTransaction extends TransactionType {
    handlerTransaction(request, account) {
        let creditTransaction = new Transaction();

        if ( this.checkBalance(request, account.totalAmount) ) {
            account.totalAmount = ( account.totalAmount + request.amount );
            creditTransaction.status = ( status.REGISTERED );
            creditTransaction.description = ( "Credit Transaction created Successfully." );
        } else {
            creditTransaction.status = ( status.FAILED );
            creditTransaction.description = ( "Could't create a Credit Transaction." );
        }

        creditTransaction.amount = ( request.amount );
        creditTransaction.type = ( request.type );
        creditTransaction.account = ( account );

        return creditTransaction;
    };

    checkBalance(request, accountBalance) {
        return ( request.amount()>0 );
    }
}

module.exports = { CreditTransaction };
