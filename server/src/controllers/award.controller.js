const awardService = require('../services/award.service');
const asyncHandler = require('../middlewares/asyncHandler');

exports.getAwards = asyncHandler(async (req, res, next) => {
    const awards = await awardService.getAllAwards();
    res.status(200).json({ success: true, count: awards.length, data: awards });
});

exports.createAward = asyncHandler(async (req, res, next) => {
    const awardData = { ...req.body };
    if (req.files && req.files.length > 0) {
        awardData.images = req.files.map(file => `/private/award/${file.filename}`);
    } else {
        awardData.images = [];
    }
    const award = await awardService.addAward(awardData);
    res.status(201).json({ success: true, data: award });
});

exports.updateAward = asyncHandler(async (req, res, next) => {
    const awardData = { ...req.body };
    // Maintain existing images if not replaced, or handle logic as needed. 
    // Here we append or replace. Simplest is to check if new files are uploaded.
    // If files uploaded, we replace (or append, but usually replace in simple edits is safer unless managed explicitly).
    // Let's Append for now, or check typical requirement. User said "upto 2".
    // Better strategy: Front end sends kept images. But `req.body.images` might be strings of kept urls.
    // We need to parse body.images if it comes as string/array from frontend form data.

    // Logic: 
    // New files -> req.files
    // Kept files -> req.body.existingImages (need to handle in frontend)

    let currentImages = [];
    if (req.body.existingImages) {
        currentImages = Array.isArray(req.body.existingImages) ? req.body.existingImages : [req.body.existingImages];
    }

    let newImages = [];
    if (req.files && req.files.length > 0) {
        newImages = req.files.map(file => `/private/award/${file.filename}`);
    }

    awardData.images = [...currentImages, ...newImages].slice(0, 2); // Ensure max 2

    const award = await awardService.updateAward(req.params.id, awardData);
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
