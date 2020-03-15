const express = require('express');
const router = express.Router();

const accountService = require('../service/account.service');
const util = require('../service/util.service');
const interceptor = require('../service/interceptor.service');

/* GET account transactions listing. */
router.get(`/transactions/:accountId`, async (req, res, next) => {
  try {
    interceptor.response( res, 200, 'SUCCESS', await accountService.getAllTransactions(req.params.accountId) );
  } catch (err) {
    interceptor.response( res, 500, 'FAIL', { errorMessage: err.message }, err );
  }
});

/* GET account listing. */
router.get(`/accountData/:userId`, async (req, res, next) => {
  try {
    interceptor.response( res, 200, 'SUCCESS', await accountService.getDataByUserId(req.params.userId) );
  } catch (err) {
    interceptor.response( res, 500, 'FAIL', { errorMessage: err.message }, err );
  }
});

/* POST account listing. */
router.post(`/save/:accountId`, async (req, res, next) => {
  const context = { id: req.params.accountId, description: `request(post) #${req.params.accountId}` };
  try {
    if (util._lockObj.state === true) throw new Error('::: Resource is locked :::');
    await util.Lock(context);
    await accountService.saveAccountTransaction(req.body, req.params.accountId);
    return interceptor.response(res, 200, 'SUCCESS', { info: 'The Transaction was persisted Successfully!' } );

  } catch (err) {
      interceptor.response(res, 409, 'FAILED', err, err.message);

  } finally {
      await util.UnLock(context);
  }
});

/* GET transaction listing. */
router.get(`/transaction/:id`, async (req, res, next) => {
  try {
    interceptor.response( res, 200, 'SUCCESS', await accountService.getTransactionById(req.params.id) );
  } catch (err) {
    interceptor.response( res, 500, 'FAIL', { errorMessage: err.message }, err );
  }
});

/* GET account balance listing. */
router.get(`/balance/:id`, async (req, res, next) => {
  try {
    interceptor.response( res, 200, 'SUCCESS', await accountService.getBalanceById(req.params.id) );
  } catch (err) {
    interceptor.response( res, 500, 'FAIL', { errorMessage: err.message }, err );
  }
});

module.exports = router;
