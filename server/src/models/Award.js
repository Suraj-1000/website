const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Award = sequelize.define('Award', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    issuer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY, // YYYY-MM-DD
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING, // URL to image
        allowNull: true,
    }
}, {
    timestamps: true,
    tableName: 'awards'
});

module.exports = Award;
