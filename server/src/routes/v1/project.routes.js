const { Router } = require('express');
const projectController = require('@/controllers/project.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();
const adminOnly = [protect, authorize('admin')];

router.route('/')
   .get(projectController.getAll)
   .post(adminOnly, projectController.create);

router.route('/:id')
   .put(adminOnly, projectController.update)
   .patch(adminOnly, projectController.update)
   .delete(adminOnly, projectController.delete);

module.exports = router;
