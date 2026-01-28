const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Education = sequelize.define('Education', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    degree: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    level: {
        type: DataTypes.STRING, // e.g. "Plus Two", "Bachelors", "School"
        allowNull: true,
    },
    institution: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true, // Made nullable to avoid breaking if migration doesn't fill it
    },
    year: {
        type: DataTypes.STRING,
        allowNull: true, // Legacy support or optional
    },
    startYear: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    endYear: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    grade: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    icon: {
        type: DataTypes.STRING, // "GraduationCap", etc.
        allowNull: false,
        defaultValue: 'School'
    },
    color: {
        type: DataTypes.STRING, // "text-primary"
        allowNull: false,
        defaultValue: 'text-primary'
    }
}, {
    timestamps: true,
    tableName: 'educations'
});

module.exports = Education;
