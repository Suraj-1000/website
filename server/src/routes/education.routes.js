const express = require('express');
const router = express.Router();
const educationController = require('../controllers/education.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

router.get('/', educationController.getEducations);
router.post('/', protect, authorize('admin'), educationController.createEducation);
router.put('/:id', protect, authorize('admin'), educationController.updateEducation);
router.delete('/:id', protect, authorize('admin'), educationController.deleteEducation);

module.exports = router;
