'use strict';
const { Client } = require('pg');
const configLoader = require('./config-loader');

let connection;

module.exports.getDB = (config) => {
    return new Promise((resolve, reject) => {
        console.log("Starting getDB...");

        if (connection) {
            console.log('Retrieving already existing connection.');
            resolve(connection);

        } else {
            let client = new Client({
                        user: config.DB_USER,
                        host: config.DB_HOST,
                        database: config.DB_DATABASE,
                        password: config.DB_PASSWORD,
                        port: config.DB_PORT
            });
            console.log('Attempting to connect to DB...');
            client.connect()
                .then(() => {
                            console.log('DB Connection successfully');
                            connection = client;
                            resolve(client);
                        })
                .catch(err => {
                            console.log('Error connecting DB: ' + err);
                            reject(err);
                });
        }
    });
};
