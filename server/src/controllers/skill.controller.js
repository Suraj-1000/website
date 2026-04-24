const asyncHandler = require('../middlewares/asyncHandler');
const skillService = require('../services/skill.service');
const { NotFoundException } = require('../exceptions/error.exception');

class SkillController {
   getAll = asyncHandler(async (req, res) => {
      const skills = await skillService.findAll();
      res.status(200).json({ success: true, count: skills.length, data: skills });
   });

   getById = asyncHandler(async (req, res) => {
      const skill = await skillService.findById(req.params.id);
      if (!skill) return res.status(404).json({ success: false, error: 'Skill not found' });
      res.status(200).json({ success: true, data: skill });
   });

   create = asyncHandler(async (req, res) => {
      const skill = await skillService.create(req.body);
      res.status(201).json({ success: true, data: skill });
   });

   update = asyncHandler(async (req, res) => {
      const skill = await skillService.update(req.params.id, req.body);
      if (!skill) throw new NotFoundException('Skill not found');
      res.status(200).json({ success: true, data: skill });
   });

   delete = asyncHandler(async (req, res) => {
      const result = await skillService.delete(req.params.id);
      if (!result) throw new NotFoundException('Skill not found');
      res.status(200).json({ success: true, data: {} });
   });
}

module.exports = new SkillController();
