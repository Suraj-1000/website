const router = require("express").Router();
const authController = require("../../controllers/auth.controller");
const { checkAuth } = require("../../middlewares/authMiddleware");

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.get('/me', checkAuth, authController.getMe);

module.exports = router;
