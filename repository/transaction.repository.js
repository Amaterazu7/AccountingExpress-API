const CrudRepository = require('./crud.repository');

module.exports = class TransactionRepository extends CrudRepository {
    constructor(entityId) {
        super('transaction', entityId);
    }

    async findByAccountId(accountId) {
        try {
            const config = this.configLoader.getConfig();
            const conn = await this.db.getDB(config);
            const sql = ` SELECT * FROM ${this.entity} WHERE account_user_id = $1 ; `;
            let result = await conn.query(sql, [accountId]);
            console.log(result.rows);

            return result.rows;

        } catch (e) {
            throw new Error(e);
        }
    }

};
