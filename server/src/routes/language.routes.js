const express = require('express');
const {
    getLanguages,
    createLanguage,
    updateLanguage,
    deleteLanguage
} = require('../controllers/language.controller');

const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
    .get(getLanguages)
    .post(protect, createLanguage);

router.route('/:id')
    .put(protect, updateLanguage)
    .patch(protect, updateLanguage)
    .delete(protect, deleteLanguage);

module.exports = router;
