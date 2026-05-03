const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/db');

router.get('/', async (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
        services: {
            database: 'UNKNOWN'
        }
    };

    try {
        await sequelize.authenticate();
        healthcheck.services.database = 'CONNECTED';
        res.status(200).send(healthcheck);
    } catch (e) {
        healthcheck.message = e;
        healthcheck.services.database = 'DISCONNECTED';
        res.status(503).send(healthcheck);
    }
});

module.exports = router;
