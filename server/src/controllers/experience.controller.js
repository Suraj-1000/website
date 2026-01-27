const asyncHandler = require('../middlewares/asyncHandler');
const experienceService = require('../services/experience.service');

exports.getExperiences = asyncHandler(async (req, res, next) => {
    const experiences = await experienceService.getAllExperiences();

    res.status(200).json({
        success: true,
        count: experiences.length,
        data: experiences
    });
});

exports.createExperience = asyncHandler(async (req, res, next) => {
    const experience = await experienceService.createExperience(req.body);

    res.status(201).json({
        success: true,
        data: experience
    });
});

exports.updateExperience = asyncHandler(async (req, res, next) => {
    const experience = await experienceService.updateExperience(req.params.id, req.body);

    if (!experience) {
        return res.status(404).json({ success: false, error: 'Experience not found' });
    }

    res.status(200).json({
        success: true,
        data: experience
    });
});

exports.deleteExperience = asyncHandler(async (req, res, next) => {
    const success = await experienceService.deleteExperience(req.params.id);

    if (!success) {
        return res.status(404).json({ success: false, error: 'Experience not found' });
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});
