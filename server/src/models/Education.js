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
    fieldOfStudy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    institution: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    graduationYear: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gpa: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: true,
    tableName: 'educations'
});

// Sync model (basic, handled in server.js but good to export)
module.exports = Education;
