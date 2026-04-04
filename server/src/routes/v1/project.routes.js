const { Router } = require('express');
const {
   getProjects,
   createProject,
   updateProject,
   deleteProject,
} = require('@/controllers/project.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();

router.route('/')
   .get(getProjects)
   .post(protect, authorize('admin'), createProject);

router.route('/:id')
   .put(protect, authorize('admin'), updateProject)
   .patch(protect, authorize('admin'), updateProject)
   .delete(protect, authorize('admin'), deleteProject);

module.exports = router;
