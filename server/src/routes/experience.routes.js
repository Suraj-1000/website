const express = require('express');
const {
    getExperiences,
    createExperience,
    updateExperience,
    deleteExperience
} = require('../controllers/experience.controller');

const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
    .get(getExperiences)
    .post(protect, createExperience);

router.route('/:id')
    .put(protect, updateExperience)
    .delete(protect, deleteExperience);

module.exports = router;
