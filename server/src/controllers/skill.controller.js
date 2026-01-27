const asyncHandler = require('../utils/asyncHandler');
const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
exports.getSkills = asyncHandler(async (req, res, next) => {
    const skills = await Skill.find().sort({ createdAt: 1 });

    res.status(200).json({
        success: true,
        count: skills.length,
        data: skills
    });
});

// @desc    Create new skill category
// @route   POST /api/skills
// @access  Private
exports.createSkill = asyncHandler(async (req, res, next) => {
    const skill = await Skill.create(req.body);

    res.status(201).json({
        success: true,
        data: skill
    });
});

// @desc    Update skill category
// @route   PUT /api/skills/:id
// @access  Private
exports.updateSkill = asyncHandler(async (req, res, next) => {
    let skill = await Skill.findById(req.params.id);

    if (!skill) {
        return res.status(404).json({ success: false, error: 'Skill category not found' });
    }

    skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: skill
    });
});

// @desc    Delete skill category
// @route   DELETE /api/skills/:id
// @access  Private
exports.deleteSkill = asyncHandler(async (req, res, next) => {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
        return res.status(404).json({ success: false, error: 'Skill category not found' });
    }

    await skill.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});
