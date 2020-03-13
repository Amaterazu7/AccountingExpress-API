const AccountRepository = require('../repository/account.repository');
const TransactionRepository = require('../repository/transaction.repository');
const FactoryService = require('../service/factory.service');

const accountRepository = new AccountRepository('0');
const transactionRepository = new TransactionRepository('0');

module.exports.getDataByUserId = async (userId) => {
    console.log(`::: USER ID :::  ${userId}`);
    return await accountRepository.findByUserId(userId);
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

module.exports.getTransactionById = async (transactionId) => {
    console.log(`::: TRANSACTION ID ::: ${transactionId}`);
    transactionRepository.entityId = transactionId;
    return await transactionRepository.findById();
};

module.exports.getBalanceById = async (accountId) => {
    console.log(`::: ACCOUNT ID ::: ${accountId}`);
    accountRepository.entityId = accountId;
    return await accountRepository.findBalanceById();
};
