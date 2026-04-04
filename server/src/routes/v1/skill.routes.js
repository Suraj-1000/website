const { Router } = require('express');
const {
   getSkills,
   createSkill,
   updateSkill,
   deleteSkill,
} = require('@/controllers/skill.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();

router.route('/')
   .get(getSkills)
   .post(protect, authorize('admin'), createSkill);

router.route('/:id')
   .put(protect, authorize('admin'), updateSkill)
   .patch(protect, authorize('admin'), updateSkill)
   .delete(protect, authorize('admin'), deleteSkill);

module.exports = router;
