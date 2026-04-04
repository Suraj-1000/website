const asyncHandler = require('@/middlewares/asyncHandler');
const skillService = require('@/services/skill.service');

exports.getSkills = asyncHandler(async (req, res) => {
   const skills = await skillService.findAll();
   res.status(200).json({ success: true, count: skills.length, data: skills });
});

exports.createSkill = asyncHandler(async (req, res) => {
   const skill = await skillService.create(req.body);
   res.status(201).json({ success: true, data: skill });
});

exports.updateSkill = asyncHandler(async (req, res) => {
   const skill = await skillService.update(req.params.id, req.body);
   if (!skill) return res.status(404).json({ success: false, error: 'Skill not found' });
   res.status(200).json({ success: true, data: skill });
});

exports.deleteSkill = asyncHandler(async (req, res) => {
   const result = await skillService.delete(req.params.id);
   if (!result) return res.status(404).json({ success: false, error: 'Skill not found' });
   res.status(200).json({ success: true, data: {} });
});
