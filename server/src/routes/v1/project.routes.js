const { Router } = require('express');
const projectController = require('@/controllers/project.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();

router.route('/')
   .get(projectController.getAll)
   .post(protect, authorize('admin'), projectController.create);

router.route('/:id')
   .put(protect, authorize('admin'), projectController.update)
   .patch(protect, authorize('admin'), projectController.update)
   .delete(protect, authorize('admin'), projectController.delete);

module.exports = router;
