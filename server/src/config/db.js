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

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL Connected Successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
