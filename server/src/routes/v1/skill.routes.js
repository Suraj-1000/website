const { Router } = require('express');
const skillController = require('@/controllers/skill.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();

router.route('/')
   .get(skillController.getAll)
   .post(protect, authorize('admin'), skillController.create);

router.route('/:id')
   .put(protect, authorize('admin'), skillController.update)
   .patch(protect, authorize('admin'), skillController.update)
   .delete(protect, authorize('admin'), skillController.delete);

module.exports = router;
