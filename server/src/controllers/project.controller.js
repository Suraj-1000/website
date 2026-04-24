const asyncHandler = require('@/middlewares/asyncHandler');
const projectService = require('@/services/project.service');

class ProjectController {
   getAll = asyncHandler(async (req, res) => {
      const projects = await projectService.findAll();
      res.status(200).json({ success: true, count: projects.length, data: projects });
   });

   getById = asyncHandler(async (req, res) => {
      const project = await projectService.findById(req.params.id);
      if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
      res.status(200).json({ success: true, data: project });
   });

   create = asyncHandler(async (req, res) => {
      const project = await projectService.create(req.body);
      res.status(201).json({ success: true, data: project });
   });

   update = asyncHandler(async (req, res) => {
      const project = await projectService.update(req.params.id, req.body);
      if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
      res.status(200).json({ success: true, data: project });
   });

   delete = asyncHandler(async (req, res) => {
      const result = await projectService.delete(req.params.id);
      if (!result) return res.status(404).json({ success: false, error: 'Project not found' });
      res.status(200).json({ success: true, data: {} });
   });
}

module.exports = new ProjectController();
