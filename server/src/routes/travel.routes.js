const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel.controller');

router.get('/', (req, res) => travelController.getTravels(req, res));
router.post('/', (req, res) => travelController.createTravel(req, res));

module.exports = router;
