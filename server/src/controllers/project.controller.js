const projectService = require('../services/project.service');

class ProjectController {
    async getProjects(req, res) {
        try {
            const projects = await projectService.getAllProjects();
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createProject(req, res) {
        try {
            const project = await projectService.addProject(req.body);
            res.status(201).json(project);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ProjectController();
