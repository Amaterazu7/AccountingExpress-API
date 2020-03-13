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
            const sql = ` INSERT INTO ${this.entity} (id, create_date, modification_date, email, name, surname)
                               VALUES ($1, $2, now(), $3, $4, $5) RETURNING id ; `;
            let result = await conn.query(sql, [user.id, user.creationDate, user.email, user.name, user.surname]);
            console.log(result.rows);
            return result.rows[0].id;

        } catch (e) {
            throw new Error(e);
        }
    }

    async update(user) {
        try {
            const config = configLoader.getConfig();
            const conn = await db.getDB(config);
            console.log('UPDATING!!....', user);
            const sql = ` UPDATE ${this.entity} SET email = $1, name = $2, surname = $3, modification_date = now() WHERE id = $4 ; `;
            const result = await conn.query(sql, [user.email, user.name, user.surname, user.id]);
            console.log(result.rows);

        } catch (e) {
            throw new Error(e);
        }
    }

};
