const router = require("express").Router();
const contactController = require("../../controllers/contact.controller");
const { checkAuth, authorize } = require("../../middlewares/authMiddleware");

const adminOnly = [checkAuth, authorize('admin')];

router.post('/', contactController.submitContact);
router.get('/', adminOnly, contactController.getAllContacts);
router.post('/:id/reply', adminOnly, contactController.replyToContact);

module.exports = router;
