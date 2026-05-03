const { Router } = require('express');

const router = Router();

// Health Check
router.use('/health', require('./health.routes'));

// API Version 1
router.use('/v1', require('./v1'));

module.exports = router;
