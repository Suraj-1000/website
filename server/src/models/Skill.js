const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Skill = sequelize.define('Skill', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    items: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: []
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'skills'
});

module.exports = Skill;
