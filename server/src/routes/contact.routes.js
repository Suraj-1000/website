const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

// Public can submit contact form
router.post('/', contactController.submitContact);

// Only admin can view all contacts
router.get('/', protect, authorize('admin'), contactController.getAllContacts);

// Admin reply to contact
router.post('/:id/reply', protect, authorize('admin'), contactController.replyToContact);

module.exports = router;
