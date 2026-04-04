const { sequelize, Sequelize } = require('@/config/db');

// Import models
const User = require('./User');
const Travel = require('./Travel');
const Skill = require('./Skill');
const Reference = require('./Reference');
const Project = require('./Project');
const Language = require('./Language');
const Experience = require('./Experience');
const Education = require('./Education');
const Contact = require('./Contact');
const Award = require('./Award');

const db = {
    sequelize,
    Sequelize,
    User,
    Travel,
    Skill,
    Reference,
    Project,
    Language,
    Experience,
    Education,
    Contact,
    Award
};

// If any model has associate method, call it
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
