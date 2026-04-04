const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const {
   getAwards,
   createAward,
   updateAward,
   deleteAward,
} = require('@/controllers/award.controller');
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
   .get(getAwards)
   .post(protect, authorize('admin'), upload.array('images', 2), createAward);

router.route('/:id')
   .put(protect, authorize('admin'), upload.array('images', 2), updateAward)
   .patch(protect, authorize('admin'), upload.array('images', 2), updateAward)
   .delete(protect, authorize('admin'), deleteAward);

module.exports = router;
