const { Router } = require('express');
const contactController = require('@/controllers/contact.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();
const adminOnly = [protect, authorize('admin')];

router.post('/', contactController.submitContact);
router.get('/', adminOnly, contactController.getAllContacts);
router.post('/:id/reply', adminOnly, contactController.replyToContact);

module.exports = router;
