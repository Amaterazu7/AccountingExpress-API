const CrudRepository = require('./crud.repository');

module.exports = class AccountRepository extends CrudRepository {
    constructor(entityId) {
        super('account', entityId);
    }

    async findByUserId (userId) {
        try {
            const config = this.configLoader.getConfig();
            const conn = await this.db.getDB(config);
            const sql = ` SELECT * FROM ${this.entity} WHERE user_id = $1 ; `;
            let result = await conn.query(sql, [userId]);
            console.log(result.rows);

            return result.rows[0];

        } catch (e) {
            throw new Error(e);
        }

    };

    async findBalanceById () {
        try {
            const config = this.configLoader.getConfig();
            const conn = await this.db.getDB(config);
            const sql = ` SELECT total_amount AS "TotalAmount" FROM ${this.entity} WHERE user_id = $1 ; `;
            let result = await conn.query(sql, [this.entityId]);
            console.log(result.rows);

            return result.rows[0];

        } catch (e) {
            throw new Error(e);
        }

    };
};
