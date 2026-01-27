const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel.controller');
const { protect } = require('../middlewares/auth.middleware');

router.get('/', travelController.getTravels);
router.post('/', protect, travelController.createTravel);

module.exports = router;
