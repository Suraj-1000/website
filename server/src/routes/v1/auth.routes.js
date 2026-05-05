const router = require("express").Router();
const authController = require("../../controllers/auth.controller");
const { checkAuth } = require("../../middlewares/authMiddleware");
const validate = require('../../utils/validate.util');

const loginSchema = {
    email: { required: true, pattern: /^\S+@\S+\.\S+$/ },
    password: { required: true, min: 6 }
};

router.post('/register', authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh', authController.refresh);
router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password/:resetToken', authController.resetPassword);
router.get('/me', checkAuth, authController.getMe);

module.exports = router;
