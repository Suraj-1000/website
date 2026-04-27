const asyncHandler = require('@/middlewares/asyncHandler');
const travelService = require('@/services/travel.service');
const { NotFoundException } = require('@/exceptions/error.exception');

class TravelController {
   getAll = asyncHandler(async (req, res) => {
      const travels = await travelService.findAll();
      res.status(200).json({ success: true, count: travels.length, data: travels });
   });

   getById = asyncHandler(async (req, res) => {
      const travel = await travelService.findById(req.params.id);
      if (!travel) return res.status(404).json({ success: false, error: 'Travel record not found' });
      res.status(200).json({ success: true, data: travel });
   });

   create = asyncHandler(async (req, res) => {
      const travelData = { ...req.body };
      if (req.files && req.files.length > 0) {
         travelData.images = req.files.map(file => `/private/travel/${file.filename}`);
      } else {
         travelData.images = [];
      }
      const travel = await travelService.create(travelData);
      res.status(201).json({ success: true, data: travel });
   });

   update = asyncHandler(async (req, res) => {
      const travelData = { ...req.body };

      let currentImages = [];
      if (req.body.existingImages) {
         currentImages = Array.isArray(req.body.existingImages)
            ? req.body.existingImages
            : [req.body.existingImages];
      }

      let newImages = [];
      if (req.files && req.files.length > 0) {
         newImages = req.files.map(file => `/private/travel/${file.filename}`);
      }

      travelData.images = [...currentImages, ...newImages];

      const travel = await travelService.update(req.params.id, travelData);
      if (!travel) throw new NotFoundException('Travel not found');
      res.status(200).json({ success: true, data: travel });
   });

   delete = asyncHandler(async (req, res) => {
      const result = await travelService.delete(req.params.id);
      if (!result) throw new NotFoundException('Travel not found');
      res.status(200).json({ success: true, data: {} });
   });
}

module.exports = new TravelController();
