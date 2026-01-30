const express = require('express');
const {
    getExperiences,
    createExperience,
    updateExperience,
    deleteExperience
} = require('../controllers/experience.controller');

const { protect, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
    .get(getExperiences)
    .post(protect, authorize('admin'), createExperience);

router.route('/:id')
    .patch(protect, authorize('admin'), updateExperience)
    .delete(protect, authorize('admin'), deleteExperience);

module.exports = router;
