const express = require('express');
const router = express.Router();
const profileController = require('@/controllers/profile.controller');
const { checkAuth, authorize } = require('@/middlewares/authMiddleware');

router.route('/')
    .get(profileController.get)
    .post(checkAuth, authorize('admin'), profileController.upsert)
    .patch(checkAuth, authorize('admin'), profileController.upsert)
    .put(checkAuth, authorize('admin'), profileController.upsert);

module.exports = router;
