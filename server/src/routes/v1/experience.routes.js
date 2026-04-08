const { Router } = require('express');
const experienceController = require('@/controllers/experience.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();
const adminOnly = [protect, authorize('admin')];

router.route('/')
   .get(experienceController.getAll)
   .post(adminOnly, experienceController.create);

router.route('/:id')
   .put(adminOnly, experienceController.update)
   .patch(adminOnly, experienceController.update)
   .delete(adminOnly, experienceController.delete);

module.exports = router;
