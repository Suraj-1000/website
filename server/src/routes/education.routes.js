const express = require('express');
const router = express.Router();
const educationController = require('../controllers/education.controller');

// Bind the controller context if necessary, or use arrow functions in controller
router.get('/', (req, res) => educationController.getEducations(req, res));
router.post('/', (req, res) => educationController.createEducation(req, res));

module.exports = router;
