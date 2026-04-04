const { Router } = require('express');
const { getTravels, createTravel } = require('@/controllers/travel.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();

router.route('/')
   .get(getTravels)
   .post(protect, authorize('admin'), createTravel);

module.exports = router;
