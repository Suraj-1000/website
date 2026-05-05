const asyncHandler = require('@/middlewares/asyncHandler');
const projectService = require('@/services/project.service');

/**
 * Controller for managing portfolio projects.
 * Handles CRUD operations for project showcases.
 */
class ProjectController {
   /**
    * @desc    Get all projects
    * @route   GET /api/v1/projects
    * @access  Public
    */
   getAll = asyncHandler(async (req, res) => {
      const projects = await projectService.findAll();
      res.status(200).json({ success: true, count: projects.length, data: projects });
   });

   /**
    * @desc    Get a single project by ID
    * @route   GET /api/v1/projects/:id
    * @access  Public
    */
   getById = asyncHandler(async (req, res) => {
      const project = await projectService.findById(req.params.id);
      if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
      res.status(200).json({ success: true, data: project });
   });

   /**
    * @desc    Create a new project
    * @route   POST /api/v1/projects
    * @access  Private/Admin
    */
   create = asyncHandler(async (req, res) => {
      const projectData = { ...req.body };
      if (req.file) {
         projectData.imageUrl = `/public/projects/${req.file.filename}`;
      }
      const project = await projectService.create(projectData);
      res.status(201).json({ success: true, data: project });
   });

   /**
    * @desc    Update an existing project
    * @route   PUT /api/v1/projects/:id
    * @access  Private/Admin
    */
   update = asyncHandler(async (req, res) => {
      const projectData = { ...req.body };
      if (req.file) {
         projectData.imageUrl = `/public/projects/${req.file.filename}`;
      }
      const project = await projectService.update(req.params.id, projectData);
      if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
      res.status(200).json({ success: true, data: project });
   });

   /**
    * @desc    Delete a project
    * @route   DELETE /api/v1/projects/:id
    * @access  Private/Admin
    */
   delete = asyncHandler(async (req, res) => {
      const result = await projectService.delete(req.params.id);
      if (!result) return res.status(404).json({ success: false, error: 'Project not found' });
      res.status(200).json({ success: true, data: {} });
   });
}

module.exports = new ProjectController();
