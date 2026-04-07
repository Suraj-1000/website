const asyncHandler = require('@/middlewares/asyncHandler');
const experienceService = require('@/services/experience.service');

class ExperienceController {
   getAll = asyncHandler(async (req, res) => {
      const experiences = await experienceService.findAll();
      res.status(200).json({ success: true, count: experiences.length, data: experiences });
   });

   create = asyncHandler(async (req, res) => {
      const experience = await experienceService.create(req.body);
      res.status(201).json({ success: true, data: experience });
   });

   update = asyncHandler(async (req, res) => {
      const experience = await experienceService.update(req.params.id, req.body);
      if (!experience) return res.status(404).json({ success: false, error: 'Experience not found' });
      res.status(200).json({ success: true, data: experience });
   });

   delete = asyncHandler(async (req, res) => {
      const result = await experienceService.delete(req.params.id);
      if (!result) return res.status(404).json({ success: false, error: 'Experience not found' });
      res.status(200).json({ success: true, data: {} });
   });
}

module.exports = new ExperienceController();
