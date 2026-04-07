const { Router } = require('express');
const experienceController = require('@/controllers/experience.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();

router.route('/')
   .get(experienceController.getAll)
   .post(protect, authorize('admin'), experienceController.create);

router.route('/:id')
   .put(protect, authorize('admin'), experienceController.update)
   .patch(protect, authorize('admin'), experienceController.update)
   .delete(protect, authorize('admin'), experienceController.delete);

module.exports = router;
