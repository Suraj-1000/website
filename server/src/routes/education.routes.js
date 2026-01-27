const express = require('express');
const router = express.Router();
const educationController = require('../controllers/education.controller');
const { protect } = require('../middlewares/auth.middleware');

router.get('/', educationController.getEducations);
router.post('/', protect, educationController.createEducation);
router.put('/:id', protect, educationController.updateEducation);
router.delete('/:id', protect, educationController.deleteEducation);

module.exports = router;
