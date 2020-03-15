
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

let _lockObj = { state: false };
module.exports._lockObj = _lockObj;
const timestamp = () => new Date().toUTCString();

module.exports.Lock = async (context) => {
    if (!_lockObj['lockId']) {
        _lockObj.state = true;
        _lockObj['lockId'] = context.id;
        console.log('\n', timestamp(), '\n', context, '\n','::: Lock acquired :::', '\n');
        return new Promise((resolve) => resolve() );

    } else {
        console.log('\n',
            timestamp(),
            context.description,
            `Failed to lock the payment: payment is already locked by ${_lockObj.lockId}`
        );
    }
};

module.exports.UnLock = async (context) => {
    console.log('\n', timestamp(), '\n', context, '\n', '::: Payment is unlocked :::', '\n');
    _lockObj.state = false;
    delete _lockObj['lockId'];
    return new Promise((resolve) => resolve() );
};
