const AccountRepository = require('../repository/account.repository');
const TransactionRepository = require('../repository/transaction.repository');
const FactoryService = require('../service/factory.service');

const accountRepository = new AccountRepository('0');
const transactionRepository = new TransactionRepository('0');

module.exports.getDataByUserId = (userId) => {
    console.log(`::: USER ID :::  ${userId}`);
    return accountRepository.findByUserId(userId);
};

module.exports.createAccountTransaction = (transaction, accountId) => {
    return accountRepository.findById(accountId)
        .map( account => FactoryService.createTransaction(transaction.type).handlerTransaction(transaction, account) )
        .map( transaction => saveAccountTransaction(transaction) )
        .onError( new Error(`ERROR :: Error in transaction with account ID = ${accountId}`) );
};

module.exports.saveAccountTransaction = (transaction) => {
    accountRepository.save( transaction.account );
    return transactionRepository.save( transaction );
};

module.exports.getAllTransactions = async (accountId) => {
    console.log(`::: ACCOUNT ID ::: ${accountId}`);
    return await transactionRepository.findByAccountId(accountId);
};

module.exports.getTransactionById = (transactionId) => {
    console.log(`::: TRANSACTION ID ::: ${transactionId}`);
    return transactionRepository.findById(transactionId);
};

module.exports.getBalanceById = (accountId) => {
    console.log(`::: ACCOUNT ID ::: ${accountId}`);
    return accountRepository.findById(accountId).get().totalAmount;
};
