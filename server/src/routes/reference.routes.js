const express = require('express');
const {
    getReferences,
    createReference,
    updateReference,
    deleteReference
} = require('../controllers/reference.controller');

const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
    .get(getReferences)
    .post(protect, createReference);

router.route('/:id')
    .put(protect, updateReference)
    .patch(protect, updateReference)
    .delete(protect, deleteReference);

module.exports = router;
