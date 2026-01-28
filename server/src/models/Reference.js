const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Reference = sequelize.define('Reference', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    relationship: {
        type: DataTypes.STRING, // e.g., "Former Manager"
        allowNull: true,
    }
}, {
    timestamps: true,
    tableName: 'references'
});

module.exports = Reference;
