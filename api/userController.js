const express = require('express');
const router = express.Router();

const userService = require('../service/user.service');
const interceptor = require('../service/interceptor.service');

/* GET users listing. */
router.get(`/`, async (req, res, next) => interceptor.response(res, 200, 'SUCCESS', await userService.getAllUser()) );

/* GET user listing. */
router.get(`/:userId`, async (req, res, next) => {
  interceptor.response(res, 200, 'SUCCESS', await userService.getUserById(req.params.userId));
});

/* POST user listing. */
router.post(`/`, async (req, res, next) => interceptor.response(res, 200, 'SUCCESS', await userService.saveUser(req.body)) );

/* PUT user listing. */
router.put(`/:userId`, async (req, res, next) => interceptor.response(res, 200, 'SUCCESS', await userService.updateUser(req.body)) );

module.exports = router;
