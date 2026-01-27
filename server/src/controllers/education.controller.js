const educationService = require('../services/education.service');
const asyncHandler = require('../middlewares/asyncHandler');

exports.getEducations = asyncHandler(async (req, res, next) => {
    const educations = await educationService.getAllEducations();
    res.status(200).json(educations);
});

exports.createEducation = asyncHandler(async (req, res, next) => {
    const education = await educationService.addEducation(req.body);
    res.status(201).json({ success: true, data: education });
});

exports.updateEducation = asyncHandler(async (req, res, next) => {
    const education = await educationService.updateEducation(req.params.id, req.body);
    if (!education) {
        return res.status(404).json({ success: false, error: 'Not Found' });
    }
    res.status(200).json({ success: true, data: education });
});

exports.deleteEducation = asyncHandler(async (req, res, next) => {
    const success = await educationService.deleteEducation(req.params.id);
    if (!success) {
        return res.status(404).json({ success: false, error: 'Not Found' });
    }
    res.status(200).json({ success: true, data: {} });
});
