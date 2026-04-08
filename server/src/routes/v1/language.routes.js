const { Router } = require('express');
const languageController = require('@/controllers/language.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();
const adminOnly = [protect, authorize('admin')];

router.route('/')
   .get(languageController.getAll)
   .post(adminOnly, languageController.create);

router.route('/:id')
   .put(adminOnly, languageController.update)
   .patch(adminOnly, languageController.update)
   .delete(adminOnly, languageController.delete);

module.exports = router;
