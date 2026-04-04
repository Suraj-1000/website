const asyncHandler = require('@/middlewares/asyncHandler');
const referenceService = require('@/services/reference.service');

exports.getReferences = asyncHandler(async (req, res) => {
   const references = await referenceService.findAll();
   res.status(200).json({ success: true, count: references.length, data: references });
});

exports.createReference = asyncHandler(async (req, res) => {
   const reference = await referenceService.create(req.body);
   res.status(201).json({ success: true, data: reference });
});

exports.updateReference = asyncHandler(async (req, res) => {
   const reference = await referenceService.update(req.params.id, req.body);
   if (!reference) return res.status(404).json({ success: false, error: 'Reference not found' });
   res.status(200).json({ success: true, data: reference });
});

exports.deleteReference = asyncHandler(async (req, res) => {
   const result = await referenceService.delete(req.params.id);
   if (!result) return res.status(404).json({ success: false, error: 'Reference not found' });
   res.status(200).json({ success: true, data: {} });
});
