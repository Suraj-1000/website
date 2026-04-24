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
      const travel = await travelService.create(req.body);
      res.status(201).json({ success: true, data: travel });
   });

   update = asyncHandler(async (req, res) => {
      const travel = await travelService.update(req.params.id, req.body);
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
