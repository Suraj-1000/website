const express = require('express');
const {
    getReferences,
    createReference,
    updateReference,
    deleteReference
} = require('../controllers/reference.controller');

const { protect, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
    .get(getReferences)
    .post(protect, authorize('admin'), createReference);

router.route('/:id')
    .put(protect, authorize('admin'), updateReference)
    .patch(protect, authorize('admin'), updateReference)
    .delete(protect, authorize('admin'), deleteReference);

module.exports = router;
