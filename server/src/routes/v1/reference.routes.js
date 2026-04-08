const { Router } = require('express');
const referenceController = require('@/controllers/reference.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();
const adminOnly = [protect, authorize('admin')];

router.route('/')
   .get(referenceController.getAll)
   .post(adminOnly, referenceController.create);

router.route('/:id')
   .put(adminOnly, referenceController.update)
   .patch(adminOnly, referenceController.update)
   .delete(adminOnly, referenceController.delete);

module.exports = router;
