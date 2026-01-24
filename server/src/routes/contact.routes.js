const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

router.post('/', contactController.submitContact);
router.get('/', contactController.getAllContacts);

module.exports = router;
