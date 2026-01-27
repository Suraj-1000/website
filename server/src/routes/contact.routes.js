const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { protect } = require('../middlewares/auth.middleware');

// Public can submit contact form
router.post('/', contactController.submitContact);

// Only admin can view all contacts
router.get('/', protect, contactController.getAllContacts);

module.exports = router;
