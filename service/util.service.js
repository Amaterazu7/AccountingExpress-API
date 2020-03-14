const interceptor = require('../service/interceptor.service');
let _lockObj = { state: false };

module.exports.min = () => 1000000000000;

module.exports.max = () => 99999999999999;

module.exports.randomCode = (min, max) => Math.round(Math.random() * (max - min) + min);

module.exports.transaction = async (conn, type) => {
    try {
        let resolve = await conn.query(type);
        console.log(`:: ${type} >> Okay! ::`);
        return resolve;

    } catch (err) {
        console.log(`:: ERROR >> ${type} transaction.`, err);
        throw err;

    }
};


module.exports.handleWithLock = async (context, fn, res) => {
    try {
        await lock(context);
        if (_lockObj.state === true) new Error('::: Resource is locked :::');
        const result = await fn();
        if (result) return interceptor.response(res, 200, 'SUCCESS', result);
        interceptor.response(res, 204, 'SUCCESS', { data: 'No Content' });

    } catch (err) {
        interceptor.response(res, 409, 'FAILED', err, err.message);

    } finally {
        await unlock(context);
    }
};

const timestamp = () => new Date().toUTCString();

const lock = async (context) => {
    if (!_lockObj['lockId']) {
        _lockObj.state = true;
        _lockObj['lockId'] = context.id;
        console.log(timestamp(), context.description, '::: Lock acquired :::');

    } else {
        console.log(
            timestamp(),
            context.description,
            `failed to lock the payment: payment is already locked by ${_lockObj.lockId}`
        );
    }
};

const unlock = async (context) => {
    console.log(timestamp(), context, `::: Payment is unlocked :::`);
    _lockObj.state = false;
    delete _lockObj['lockId'];
};
