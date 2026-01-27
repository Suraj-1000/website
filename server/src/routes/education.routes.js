const express = require('express');
const router = express.Router();
const educationController = require('../controllers/education.controller');
const { protect } = require('../middlewares/auth.middleware');

router.get('/', educationController.getEducations);
router.post('/', protect, educationController.createEducation);

// Assuming controllers have these methods or I need to check controller files first?
// For safety, I will stick to what's visible or safely assume standard CRUD if I can check controller, but I haven't checked controllers yet.
// However, to implementation "Admin" successfully I need full CRUD.
// I'll assume I might need to add update/delete to controllers too if missing.
// Let's standardise the routes first.

module.exports = router;
