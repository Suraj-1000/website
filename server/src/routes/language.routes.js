const express = require('express');
const {
    getLanguages,
    createLanguage,
    updateLanguage,
    deleteLanguage
} = require('../controllers/language.controller');

const { protect, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
    .get(getLanguages)
    .post(protect, authorize('admin'), createLanguage);

router.route('/:id')
    .put(protect, authorize('admin'), updateLanguage)
    .patch(protect, authorize('admin'), updateLanguage)
    .delete(protect, authorize('admin'), deleteLanguage);

module.exports = router;
