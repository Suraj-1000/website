const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');

router.get('/', (req, res) => projectController.getProjects(req, res));
router.post('/', (req, res) => projectController.createProject(req, res));

module.exports = router;
