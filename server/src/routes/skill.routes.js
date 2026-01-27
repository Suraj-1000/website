const express = require('express');
const {
    getSkills,
    createSkill,
    updateSkill,
    deleteSkill
} = require('../controllers/skill.controller');

const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
    .get(getSkills)
    .post(protect, createSkill);

router.route('/:id')
    .put(protect, updateSkill)
    .delete(protect, deleteSkill);

module.exports = router;
