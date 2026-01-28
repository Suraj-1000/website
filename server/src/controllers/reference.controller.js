const referenceService = require('../services/reference.service');
const asyncHandler = require('../middlewares/asyncHandler');

exports.getReferences = asyncHandler(async (req, res, next) => {
    const references = await referenceService.getAllReferences();
    res.status(200).json({ success: true, count: references.length, data: references });
});

exports.createReference = asyncHandler(async (req, res, next) => {
    const reference = await referenceService.addReference(req.body);
    res.status(201).json({ success: true, data: reference });
});

exports.updateReference = asyncHandler(async (req, res, next) => {
    const reference = await referenceService.updateReference(req.params.id, req.body);
    if (!reference) {
        return res.status(404).json({ success: false, error: 'Reference not found' });
    }
    res.status(200).json({ success: true, data: reference });
});

exports.deleteReference = asyncHandler(async (req, res, next) => {
    const success = await referenceService.deleteReference(req.params.id);
    if (!success) {
        return res.status(404).json({ success: false, error: 'Reference not found' });
    }
    res.status(200).json({ success: true, data: {} });
});
