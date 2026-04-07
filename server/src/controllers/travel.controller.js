const asyncHandler = require('@/middlewares/asyncHandler');
const travelService = require('@/services/travel.service');

class TravelController {
   getAll = asyncHandler(async (req, res) => {
      const travels = await travelService.findAll();
      res.status(200).json({ success: true, count: travels.length, data: travels });
   });

   create = asyncHandler(async (req, res) => {
      const travel = await travelService.create(req.body);
      res.status(201).json({ success: true, data: travel });
   });
}

module.exports = new TravelController();
