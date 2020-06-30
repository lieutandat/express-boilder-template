const { Sequelize } = require('sequelize');

const config = require('../configs');

const sequelize = new Sequelize(
    config.database.db,
    config.database.username,
    config.database.password,
    {
        host: config.database.host,
        dialect: config.database.dialect, /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
        port: config.database.port,
        pool: {
            ...config.database.pool
        },
        logging: config.database.logging
    },
);

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connect();

module.exports = sequelize
