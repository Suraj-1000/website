const projectService = require('../services/project.service');
const asyncHandler = require('../middlewares/asyncHandler');

exports.getProjects = asyncHandler(async (req, res, next) => {
    const projects = await projectService.getAllProjects();
    res.status(200).json({ success: true, data: projects });
});

exports.createProject = asyncHandler(async (req, res, next) => {
    const project = await projectService.addProject(req.body);
    res.status(201).json({ success: true, data: project });
});

exports.updateProject = asyncHandler(async (req, res, next) => {
    const project = await projectService.updateProject(req.params.id, req.body);
    if (!project) {
        return res.status(404).json({ success: false, error: 'Not Found' });
    }
    res.status(200).json({ success: true, data: project });
});

exports.deleteProject = asyncHandler(async (req, res, next) => {
    const success = await projectService.deleteProject(req.params.id);
    if (!success) {
        return res.status(404).json({ success: false, error: 'Not Found' });
    }
    res.status(200).json({ success: true, data: {} });
});
