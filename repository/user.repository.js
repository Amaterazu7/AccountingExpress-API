const CrudRepository = require('./crud.repository');
const db = require('../config/db');
const configLoader = require('../config/config-loader');

module.exports = class UserRepository extends CrudRepository {
    constructor(entityId) {
        super('"user"', entityId);
    }

    async save(user) {
        try {
            const config = configLoader.getConfig();
            const conn = await db.getDB(config);
            const sql = `INSERT INTO ${this.entity} (create_date, code_id, email, name, surname)
                         VALUES (now(), $1, $2, $3, $4) RETURNING id ; `;
            let result = await conn.query(sql, [user.codeId, user.email, user.name, user.surname]);
            console.log(result.rows);

            return result.rows[0].id;

        } catch (e) {
            throw new Error(e);
        }
    }

};
