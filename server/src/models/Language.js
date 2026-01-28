const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Language = sequelize.define('Language', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    proficiency: {
        type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native'),
        allowNull: false,
        defaultValue: 'Intermediate'
    }
}, {
    timestamps: true,
    tableName: 'languages'
});

module.exports = Language;
