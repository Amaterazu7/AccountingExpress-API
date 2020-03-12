const fs = require('fs');
let alias = 'LOCAL';
let env_config;

module.exports.getConfig = () => {
    console.log('Entering on load config.');
    if (env_config) {
        console.log('Retrieving already loaded config');
        return env_config;

    } else {
        return loadConfig();

    }
};

const loadConfig = () => {
    try {
        // const configJson = fs.readFileSync('env-config.json');
        // console.log('Successfully loaded config');
        // const config = JSON.parse(configJson.toString());
        // env_config = config[alias];
        env_config = {
            DB_DATABASE: "postgres",
            DB_HOST: "127.0.0.1",
            DB_PASSWORD: "testAccount",
            DB_PORT: "5432",
            DB_USER: "postgres",
            POOL_MAX: 1
        };
        return env_config;

    } catch (e) {
        console.error('Failed to get configuration.', e);
        throw e;
    }
};

