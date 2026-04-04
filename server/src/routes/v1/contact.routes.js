const { Router } = require('express');
const {
   submitContact,
   getAllContacts,
   replyToContact,
} = require('@/controllers/contact.controller');
const { protect, authorize } = require('@/middlewares/auth.middleware');

const router = Router();

router.post('/', submitContact);
router.get('/', protect, authorize('admin'), getAllContacts);
router.post('/:id/reply', protect, authorize('admin'), replyToContact);

module.exports = router;
