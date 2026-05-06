const { Sequelize } = require('sequelize');
const { envConfig } = require('./index');

const sequelize = new Sequelize(
    envConfig.DB.NAME,
    envConfig.DB.USER,
    envConfig.DB.PASSWORD,
    {
        host: envConfig.DB.HOST,
        dialect: 'postgres',
        logging: false,
    }
);

module.exports = { sequelize };
