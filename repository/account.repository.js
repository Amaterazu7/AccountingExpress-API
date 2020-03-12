const CrudRepository = require('./crud.repository');

module.exports = class AccountRepository extends CrudRepository {
    constructor(entityId) {
        super('account', entityId);
    }

    findByUserId (userId) { return; };
};
