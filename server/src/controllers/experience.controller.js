const asyncHandler = require('../utils/asyncHandler');
const Experience = require('../models/Experience');

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
exports.getExperiences = asyncHandler(async (req, res, next) => {
    const experiences = await Experience.find().sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: experiences.length,
        data: experiences
    });
});

// @desc    Create new experience
// @route   POST /api/experience
// @access  Private
exports.createExperience = asyncHandler(async (req, res, next) => {
    const experience = await Experience.create(req.body);

    res.status(201).json({
        success: true,
        data: experience
    });
});

// @desc    Update experience
// @route   PUT /api/experience/:id
// @access  Private
exports.updateExperience = asyncHandler(async (req, res, next) => {
    let experience = await Experience.findById(req.params.id);

    if (!experience) {
        return res.status(404).json({ success: false, error: 'Experience not found' });
    }

    experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: experience
    });
});

// @desc    Delete experience
// @route   DELETE /api/experience/:id
// @access  Private
exports.deleteExperience = asyncHandler(async (req, res, next) => {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
        return res.status(404).json({ success: false, error: 'Experience not found' });
    }

    await experience.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});
