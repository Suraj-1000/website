const asyncHandler = require('../middlewares/asyncHandler');
const awardService = require('../services/award.service');
const { NotFoundException } = require('../exceptions/error.exception');

class AwardController {
   getAll = asyncHandler(async (req, res) => {
      const awards = await awardService.findAll();
      res.status(200).json({ success: true, count: awards.length, data: awards });
   });

   getById = asyncHandler(async (req, res) => {
      const award = await awardService.findById(req.params.id);
      if (!award) return res.status(404).json({ success: false, error: 'Award not found' });
      res.status(200).json({ success: true, data: award });
   });

   create = asyncHandler(async (req, res) => {
      const awardData = { ...req.body };
      if (req.files && req.files.length > 0) {
         awardData.images = req.files.map(file => `/private/award/${file.filename}`);
      } else {
         awardData.images = [];
      }
      const award = await awardService.create(awardData);
      res.status(201).json({ success: true, data: award });
   });

   update = asyncHandler(async (req, res) => {
      const awardData = { ...req.body };

      let currentImages = [];
      if (req.body.existingImages) {
         currentImages = Array.isArray(req.body.existingImages)
            ? req.body.existingImages
            : [req.body.existingImages];
      }

      let newImages = [];
      if (req.files && req.files.length > 0) {
         newImages = req.files.map(file => `/private/award/${file.filename}`);
      }

      awardData.images = [...currentImages, ...newImages].slice(0, 2);

      const award = await awardService.update(req.params.id, awardData);
      if (!award) throw new NotFoundException('Award not found');
      res.status(200).json({ success: true, data: award });
   });

   delete = asyncHandler(async (req, res) => {
      const result = await awardService.delete(req.params.id);
      if (!result) throw new NotFoundException('Award not found');
      res.status(200).json({ success: true, data: {} });
   });
}

module.exports = new AwardController();
