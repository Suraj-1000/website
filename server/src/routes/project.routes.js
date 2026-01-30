const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

router.get('/', projectController.getProjects);
router.post('/', protect, authorize('admin'), projectController.createProject);
router.put('/:id', protect, authorize('admin'), projectController.updateProject);
router.delete('/:id', protect, authorize('admin'), projectController.deleteProject);

module.exports = router;
