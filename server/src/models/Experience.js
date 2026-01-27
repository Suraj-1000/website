const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Experience = sequelize.define('Experience', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    period: {
        // Merging startDate/endDate to 'period' to match simple string usage if preferred, 
        // OR using start/end separate fields. 
        // Frontend uses "period" or "startDate - endDate".
        // Let's stick to what I wrote in previous iteration but mapped to Sequelize: startDate, endDate
        // Actually, previous Mongoose had startDate, endDate. Frontend list displayed period || start-end.
        // Let's use startDate and endDate for structured data.
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.startDate} - ${this.endDate}`;
        },
        set(value) {
            throw new Error('Do not try to set the `period` value!');
        }
    },
    startDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: []
    }
}, {
    timestamps: true,
    tableName: 'experiences'
});

module.exports = Experience;
