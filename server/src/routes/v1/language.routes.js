const { Router } = require('express');
const languageController = require('@/controllers/language.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();

router.route('/')
   .get(languageController.getAll)
   .post(protect, authorize('admin'), languageController.create);

router.route('/:id')
   .put(protect, authorize('admin'), languageController.update)
   .patch(protect, authorize('admin'), languageController.update)
   .delete(protect, authorize('admin'), languageController.delete);

module.exports = router;
