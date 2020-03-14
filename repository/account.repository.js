const CrudRepository = require('./crud.repository');
const Util = require('../service/util.service');
const Account = require('../model/account');
const FactoryService = require('../service/factory.service');

module.exports = class AccountRepository extends CrudRepository {
    constructor(entityId) {
        super('account', entityId);
    }

    async findByUserId () {
        try {
            const config = this.configLoader.getConfig();
            const conn = await this.db.getDB(config);
            const sql = ` SELECT * FROM ${this.entity} WHERE user_id = $1 ; `;
            let result = await conn.query(sql, [this.entityId]);
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

    async persist(newTransaction, txRepository) {
        const conn = await this.db.getDB( this.configLoader.getConfig() );
        try {
            await Util.transaction(conn, 'BEGIN');

            const acc = await this.findByUserId();
            const account = new Account(acc.total_amount, acc.user_id, await txRepository.findByAccountId(txRepository.entityId), acc.version+1);
            const newTx = FactoryService.createTransaction(newTransaction.type)
                                    .handlerTransaction(newTransaction, account);

            console.dir(newTx, { depth: 999 });

            await txRepository.save(newTx, conn);
            await this.update(newTx.account, conn);

            await Util.transaction(conn, 'COMMIT');

        } catch (e) {
            console.log(`:::: ${e.message} ::::`, e);
            await Util.transaction(conn, 'ROLLBACK');
            throw new Error(`ERROR :: Error in transaction with account ID = ${this.entityId}`);
        }
    }

    async update(account, conn) {
        try {
            const sql = ` UPDATE ${this.entity} SET total_amount = $1, version = $2, modification_date = now() WHERE user_id = $3 ; `;
            await conn.query(sql, [account.totalAmount, account.version, this.entityId]);

        } catch (e) {
            throw new Error(e);
        }

    };
};
