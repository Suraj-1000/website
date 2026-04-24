const asyncHandler = require('@/middlewares/asyncHandler');
const referenceService = require('@/services/reference.service');

class ReferenceController {
   getAll = asyncHandler(async (req, res) => {
      const references = await referenceService.findAll();
      res.status(200).json({ success: true, count: references.length, data: references });
   });

   getById = asyncHandler(async (req, res) => {
      const reference = await referenceService.findById(req.params.id);
      if (!reference) return res.status(404).json({ success: false, error: 'Reference not found' });
      res.status(200).json({ success: true, data: reference });
   });

   create = asyncHandler(async (req, res) => {
      const reference = await referenceService.create(req.body);
      res.status(201).json({ success: true, data: reference });
   });

   update = asyncHandler(async (req, res) => {
      const reference = await referenceService.update(req.params.id, req.body);
      if (!reference) return res.status(404).json({ success: false, error: 'Reference not found' });
      res.status(200).json({ success: true, data: reference });
   });

   delete = asyncHandler(async (req, res) => {
      const result = await referenceService.delete(req.params.id);
      if (!result) return res.status(404).json({ success: false, error: 'Reference not found' });
      res.status(200).json({ success: true, data: {} });
   });
}

module.exports = new ReferenceController();
