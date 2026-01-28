const express = require('express');
const {
    getAwards,
    createAward,
    updateAward,
    deleteAward
} = require('../controllers/award.controller');

const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
    .get(getAwards)
    .post(protect, createAward);

router.route('/:id')
    .put(protect, updateAward)
    .patch(protect, updateAward)
    .delete(protect, deleteAward);

module.exports = router;
