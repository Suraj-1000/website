const { Router } = require('express');
const travelController = require('@/controllers/travel.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();

router.route('/')
   .get(travelController.getAll)
   .post(protect, authorize('admin'), travelController.create);

module.exports = router;
