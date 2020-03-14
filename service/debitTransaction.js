const TransactionType = require('./transactionType.service');
const Transaction = require('../model/transaction');
const Mapper = require('../model/mapper');

class DebitTransaction extends TransactionType {
    handlerTransaction(request, account) {
        let debitTransaction = new Transaction();

        if ( this.checkBalance(request, account.totalAmount) ) {
            account.totalAmount = ( account.totalAmount + request.amount );
            debitTransaction.status = ( Mapper.status().get(1) );
            debitTransaction.description = ( "Debit Transaction created Successfully." );
        } else {
            debitTransaction.status = ( Mapper.status().get(2) );
            debitTransaction.description = ( "Could't create a Debit Transaction. The Balance shouldn't be zero." );
        }

        debitTransaction.amount = ( request.amount );
        debitTransaction.type = ( request.type );
        debitTransaction.account = ( account );

        return debitTransaction;
    };

    checkBalance(request, accountBalance) {
        return ( request.amount<0 && (accountBalance+request.amount)>0 );
    }
}

module.exports = DebitTransaction;
