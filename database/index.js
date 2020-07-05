const Umzugs = require('umzug');
const path = require('path');
const db = require('./models');
const { logger } = require('../routes/middlewares/logger-winston');
const migrationPath = path.join(__dirname, './migrations/');

if (process.env.NODE_ENV !== 'test') {
    /**
     * Config migration
     */
    const umzug = new Umzugs({
        migrations: {
            path: migrationPath,
            params: [
                db.sequelize.getQueryInterface()
            ],
            pattern: /\.js$/
        },
        storageOptions: {
            sequelize: db.sequelize
        },
        storage: 'sequelize' // store migration info table by sequelize: migrationmeta
    });


    (async () => {
        try {
            await umzug.up();
            console.log('Successfully migration data');
        } catch (error) {
            console.log('Fail to migration database: ', error);
            logger(module, 'error', error);
        }
    })();
}

module.exports = db