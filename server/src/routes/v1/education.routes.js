const { Router } = require('express');
const {
   getEducations,
   createEducation,
   updateEducation,
   deleteEducation,
} = require('@/controllers/education.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();

router.route('/')
   .get(getEducations)
   .post(protect, authorize('admin'), createEducation);

router.route('/:id')
   .put(protect, authorize('admin'), updateEducation)
   .patch(protect, authorize('admin'), updateEducation)
   .delete(protect, authorize('admin'), deleteEducation);

module.exports = router;
