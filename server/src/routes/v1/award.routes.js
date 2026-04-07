const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const awardController = require('@/controllers/award.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();

const storage = multer.diskStorage({
   destination: (req, file, cb) => cb(null, 'private/award/'),
   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
   storage,
   fileFilter: (req, file, cb) => {
      const allowed = /jpeg|jpg|png|webp/;
      const valid = allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype);
      valid ? cb(null, true) : cb(new Error('Images only!'));
   },
});

router.route('/')
   .get(awardController.getAll)
   .post(protect, authorize('admin'), upload.array('images', 2), awardController.create);

router.route('/:id')
   .put(protect, authorize('admin'), upload.array('images', 2), awardController.update)
   .patch(protect, authorize('admin'), upload.array('images', 2), awardController.update)
   .delete(protect, authorize('admin'), awardController.delete);

module.exports = router;
