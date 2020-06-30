require('dotenv').config();

const config = {
    database: {
        username: process.env.SQL_USER,
        password: process.env.SQL_PASS,
        db: process.env.SQL_DB,
        host: process.env.SQL_HOST,
        port: process.env.SQL_PORT,
        dialect: process.env.SQL_DIALECT,
        logging: process.env.SQL_LOG === 'true',
        pool: {
            max: Number(process.env.SQL_POOL_LIMIT),
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            freezeTableName: true,
            timestamps: false
        },
        replication: process.env.NODE_ENV === 'production' ? {
            read: [{ host: process.env.SQL_HOST_READ }],
            write: { host: process.env.SQL_HOST_WRITE }
        } : null
    }
}

module.exports = config