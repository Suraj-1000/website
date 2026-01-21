const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Travel = sequelize.define('Travel', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    visitDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    }
}, {
    timestamps: true,
    tableName: 'travels'
});

module.exports = Travel;
