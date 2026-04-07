const asyncHandler = require('@/middlewares/asyncHandler');
const educationService = require('@/services/education.service');

class EducationController {
   getEducations = asyncHandler(async (req, res) => {
      const educations = await educationService.findAll();
      res.status(200).json({ success: true, count: educations.length, data: educations });
   });

   createEducation = asyncHandler(async (req, res) => {
      const education = await educationService.create(req.body);
      res.status(201).json({ success: true, data: education });
   });

   updateEducation = asyncHandler(async (req, res) => {
      const education = await educationService.update(req.params.id, req.body);
      if (!education) return res.status(404).json({ success: false, error: 'Education not found' });
      res.status(200).json({ success: true, data: education });
   });

   deleteEducation = asyncHandler(async (req, res) => {
      const result = await educationService.delete(req.params.id);
      if (!result) return res.status(404).json({ success: false, error: 'Education not found' });
      res.status(200).json({ success: true, data: {} });
   });
}

module.exports = new EducationController();
