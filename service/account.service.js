const AccountRepository = require('../repository/account.repository');
const TransactionRepository = require('../repository/transaction.repository');

const accountRepository = new AccountRepository('0');
const transactionRepository = new TransactionRepository('0');

module.exports.getDataByUserId = async (userId) => {
    console.log(`::: USER ID :::  ${userId}`);
    accountRepository.entityId = userId;
    return await accountRepository.findByUserId();
};

module.exports.saveAccountTransaction = async (transaction, accountId) => {
    accountRepository.entityId = accountId;
    transactionRepository.entityId = accountId;
    return accountRepository.persist(transaction, transactionRepository);
};

module.exports.getAllTransactions = async (accountId) => {
    console.log(`::: ACCOUNT ID ::: ${accountId}`);
    transactionRepository.entityId = accountId;
    return await transactionRepository.findByAccountId();
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
