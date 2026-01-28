const express = require('express');
const multer = require('multer');
const path = require('path');
const {
    getAwards,
    createAward,
    updateAward,
    deleteAward
} = require('../controllers/award.controller');

const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'private/award/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Images only!'));
        }
    }
});

router.route('/')
    .get(getAwards)
    .post(protect, upload.array('images', 2), createAward);

router.route('/:id')
    .put(protect, upload.array('images', 2), updateAward)
    .patch(protect, upload.array('images', 2), updateAward)
    .delete(protect, deleteAward);

module.exports = router;
