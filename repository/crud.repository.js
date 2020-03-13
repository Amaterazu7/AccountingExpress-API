const db = require('../config/db');
const configLoader = require('../config/config-loader');

const toBeImplemented = () => new Error ('This method must be implemented in the subclass!');;

class CrudRepository {
    constructor(entity, entityId) {
        this.entity = entity;
        this.entityId = entityId;
    }

    async findAll() {
        try {
            const config = configLoader.getConfig();
            const conn = await db.getDB(config);
            const sql = ` SELECT * FROM ${this.entity} ; `;
            let result = await conn.query(sql);
            console.log(result.rows);

            return { hi: result.rows };

        } catch (e) {
            throw new Error(e);
        }
    };

    async save() {
        toBeImplemented();
    };

    async findById() {
        try {
            const config = configLoader.getConfig();
            const conn = await db.getDB(config);
            const sql = ` SELECT * FROM ${this.entity} WHERE id = $1 ; `;
            let result = await conn.query(sql, [this.entityId]);
            console.log(result.rows);

            return result.rows;

        } catch (e) {
            throw new Error(e);
        }
    };

    async update() {
        toBeImplemented();
    };
}

module.exports = CrudRepository;
