const router = require("express").Router();
const statisticsController = require("../../controllers/statistics.controller");
const { checkAuth } = require("../../middlewares/authMiddleware");
const { restrictTo } = require("../../middlewares/authorization");

// Admin statistics
router.get("/admin", checkAuth, restrictTo('admin'), statisticsController.getAdminStats);

// Business owner statistics
router.get("/owner", checkAuth, restrictTo('vendor'), statisticsController.getArtistOwnerStats);

module.exports = router;
