const { Router } = require('express');
const educationController = require('@/controllers/education.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();
const adminOnly = [protect, authorize('admin')];

router.route('/')
   .get(educationController.getAll)
   .post(adminOnly, educationController.create);

router.route('/:id')
   .put(adminOnly, educationController.update)
   .patch(adminOnly, educationController.update)
   .delete(adminOnly, educationController.delete);

module.exports = router;
