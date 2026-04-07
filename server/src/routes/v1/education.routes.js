const { Router } = require('express');
const educationController = require('@/controllers/education.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();

router.route('/')
   .get(educationController.getAll)
   .post(protect, authorize('admin'), educationController.create);

router.route('/:id')
   .put(protect, authorize('admin'), educationController.update)
   .patch(protect, authorize('admin'), educationController.update)
   .delete(protect, authorize('admin'), educationController.delete);

module.exports = router;
