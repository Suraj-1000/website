const { Router } = require('express');

const router = Router();

// API Version 1
router.use('/v1', require('./v1'));

module.exports = router;
