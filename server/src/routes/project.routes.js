const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { protect } = require('../middlewares/auth.middleware');

router.get('/', projectController.getProjects);
router.post('/', protect, projectController.createProject);
router.put('/:id', protect, projectController.updateProject);
router.delete('/:id', protect, projectController.deleteProject);

module.exports = router;
