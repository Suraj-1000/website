const { Router } = require('express');
const awardController = require('@/controllers/award.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');
const createUpload = require('@/middlewares/upload.middleware');

const router = Router();
const upload = createUpload('private/award/');

router.route('/')
   .get(awardController.getAll)
   .post(protect, authorize('admin'), upload.array('images', 2), awardController.create);

router.route('/:id')
   .put(protect, authorize('admin'), upload.array('images', 2), awardController.update)
   .patch(protect, authorize('admin'), upload.array('images', 2), awardController.update)
   .delete(protect, authorize('admin'), awardController.delete);

module.exports = router;
