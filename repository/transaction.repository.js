const CrudRepository = require('./crud.repository');
const Mapper = require('../model/mapper');

module.exports = class TransactionRepository extends CrudRepository {
    constructor(entityId) {
        super('transaction', entityId);
    }

    async findByAccountId() {
        try {
            const config = this.configLoader.getConfig();
            const conn = await this.db.getDB(config);
            const sql = ` SELECT * FROM ${this.entity} WHERE account_user_id = $1 ; `;
            let result = await conn.query(sql, [this.entityId]);
            console.log(result.rows);

            return result.rows;

        } catch (e) {
            throw new Error(e);
        }
    }

    async save(tx, conn) {
        try {

            const sql = ` INSERT INTO ${this.entity} (id, create_date, account_user_id, amount, description, status, type)
                               VALUES ($1, now(), $2, $3, $4, $5, $6) ; `;
            await conn.query(sql, [
                tx.id, tx.account.user, tx.amount, tx.description, Mapper.status().get(tx.status), Mapper.payment().get(tx.type)
            ]);

        } catch (e) {
            throw new Error(e);
        }
    }

};
