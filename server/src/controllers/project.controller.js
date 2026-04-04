const asyncHandler = require('@/middlewares/asyncHandler');
const projectService = require('@/services/project.service');

exports.getProjects = asyncHandler(async (req, res) => {
   const projects = await projectService.findAll();
   res.status(200).json({ success: true, count: projects.length, data: projects });
});

exports.createProject = asyncHandler(async (req, res) => {
   const project = await projectService.create(req.body);
   res.status(201).json({ success: true, data: project });
});

exports.updateProject = asyncHandler(async (req, res) => {
   const project = await projectService.update(req.params.id, req.body);
   if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
   res.status(200).json({ success: true, data: project });
});

exports.deleteProject = asyncHandler(async (req, res) => {
   const result = await projectService.delete(req.params.id);
   if (!result) return res.status(404).json({ success: false, error: 'Project not found' });
   res.status(200).json({ success: true, data: {} });
});
