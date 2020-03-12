const CrudRepository = require('./crud.repository');
const db = require('../config/db');
const configLoader = require('../config/config-loader');


module.exports = class TransactionRepository extends CrudRepository {
    constructor(entityId) {
        super('transaction', entityId);
    }

    async findByAccountId(accountId) {
        try {
            const config = configLoader.getConfig();
            const conn = await db.getDB(config);
            const sql = ` SELECT * FROM ${this.entity} WHERE account_user_id = $1 ; `;
            let result = await conn.query(sql, [accountId]);
            console.log(result.rows);

            return result.rows;

        } catch (e) {
            throw new Error(e);
        }
    }

};
