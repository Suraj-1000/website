const asyncHandler = require('@/middlewares/asyncHandler');
const travelService = require('@/services/travel.service');

exports.getTravels = asyncHandler(async (req, res) => {
   const travels = await travelService.findAll();
   res.status(200).json({ success: true, count: travels.length, data: travels });
});

exports.createTravel = asyncHandler(async (req, res) => {
   const travel = await travelService.create(req.body);
   res.status(201).json({ success: true, data: travel });
});
