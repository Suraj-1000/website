const router = require("express").Router();

// API v1 routes
router.use("/v1", require("./v1"));

module.exports = router;
