const { Router } = require('express');
const referenceController = require('@/controllers/reference.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();

router.route('/')
   .get(referenceController.getAll)
   .post(protect, authorize('admin'), referenceController.create);

router.route('/:id')
   .put(protect, authorize('admin'), referenceController.update)
   .patch(protect, authorize('admin'), referenceController.update)
   .delete(protect, authorize('admin'), referenceController.delete);

module.exports = router;
