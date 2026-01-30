const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

router.get('/', travelController.getTravels);
router.post('/', protect, authorize('admin'), travelController.createTravel);

module.exports = router;
