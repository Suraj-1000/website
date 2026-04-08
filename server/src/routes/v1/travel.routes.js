const { Router } = require('express');
const travelController = require('@/controllers/travel.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();
const adminOnly = [protect, authorize('admin')];

router.route('/')
   .get(travelController.getAll)
   .post(adminOnly, travelController.create);

router.route('/:id')
   .put(adminOnly, travelController.update)
   .patch(adminOnly, travelController.update)
   .delete(adminOnly, travelController.delete);

module.exports = router;
