const awardService = require('../services/award.service');
const asyncHandler = require('../middlewares/asyncHandler');

exports.getAwards = asyncHandler(async (req, res, next) => {
    const awards = await awardService.getAllAwards();
    res.status(200).json({ success: true, count: awards.length, data: awards });
});

exports.createAward = asyncHandler(async (req, res, next) => {
    const award = await awardService.addAward(req.body);
    res.status(201).json({ success: true, data: award });
});

exports.updateAward = asyncHandler(async (req, res, next) => {
    const award = await awardService.updateAward(req.params.id, req.body);
    if (!award) {
        return res.status(404).json({ success: false, error: 'Award not found' });
    }
    res.status(200).json({ success: true, data: award });
});

exports.deleteAward = asyncHandler(async (req, res, next) => {
    const success = await awardService.deleteAward(req.params.id);
    if (!success) {
        return res.status(404).json({ success: false, error: 'Award not found' });
    }
    res.status(200).json({ success: true, data: {} });
});
