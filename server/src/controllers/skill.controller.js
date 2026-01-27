const asyncHandler = require('../middlewares/asyncHandler');
const skillService = require('../services/skill.service');

exports.getSkills = asyncHandler(async (req, res, next) => {
    const skills = await skillService.getAllSkills();

    res.status(200).json({
        success: true,
        count: skills.length,
        data: skills
    });
});

exports.createSkill = asyncHandler(async (req, res, next) => {
    const skill = await skillService.createSkill(req.body);

    res.status(201).json({
        success: true,
        data: skill
    });
});

exports.updateSkill = asyncHandler(async (req, res, next) => {
    const skill = await skillService.updateSkill(req.params.id, req.body);

    if (!skill) {
        return res.status(404).json({ success: false, error: 'Skill not found' });
    }

    res.status(200).json({
        success: true,
        data: skill
    });
});

exports.deleteSkill = asyncHandler(async (req, res, next) => {
    const success = await skillService.deleteSkill(req.params.id);

    if (!success) {
        return res.status(404).json({ success: false, error: 'Skill not found' });
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});
