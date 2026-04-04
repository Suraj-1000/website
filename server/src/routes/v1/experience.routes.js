const { Router } = require('express');
const {
   getExperiences,
   createExperience,
   updateExperience,
   deleteExperience,
} = require('@/controllers/experience.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();

router.route('/')
   .get(getExperiences)
   .post(protect, authorize('admin'), createExperience);

router.route('/:id')
   .put(protect, authorize('admin'), updateExperience)
   .patch(protect, authorize('admin'), updateExperience)
   .delete(protect, authorize('admin'), deleteExperience);

module.exports = router;
