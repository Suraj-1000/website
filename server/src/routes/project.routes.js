const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { protect } = require('../middlewares/auth.middleware');

router.get('/', projectController.getProjects);
router.post('/', protect, projectController.createProject);

module.exports = router;
