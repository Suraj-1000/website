const express = require("express");
const router = express.Router();
const mediaController = require("@/controllers/media.controller");
const upload = require("@/middlewares/upload-middleware");
const { checkAuth } = require("@/middlewares/authMiddleware");

// Upload multiple images
router.post("/upload", checkAuth, upload.array('images', 10), mediaController.uploadImages);

// Delete an image
router.post("/delete", checkAuth, mediaController.deleteImage);

module.exports = router;
