const asyncHandler = require('../middlewares/asyncHandler');
const educationService = require('../services/education.service');
const { NotFoundException } = require('../exceptions/error.exception');

class EducationController {
   getAll = asyncHandler(async (req, res) => {
      const educations = await educationService.findAll();
      res.status(200).json({ success: true, count: educations.length, data: educations });
   });

   create = asyncHandler(async (req, res) => {
      const education = await educationService.create(req.body);
      res.status(201).json({ success: true, data: education });
   });

   update = asyncHandler(async (req, res) => {
      const education = await educationService.update(req.params.id, req.body);
      if (!education) throw new NotFoundException('Education not found');
      res.status(200).json({ success: true, data: education });
   });

   delete = asyncHandler(async (req, res) => {
      const result = await educationService.delete(req.params.id);
      if (!result) throw new NotFoundException('Education not found');
      res.status(200).json({ success: true, data: {} });
   });
}

module.exports = new EducationController();
