const asyncHandler = require('../middlewares/asyncHandler');
const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken');
const { UnAuthorizedException, BadRequestException, InternalServerException, NotFoundException } = require('../exceptions/error.exception');
const sendEmail = require('../utils/emailService');

class AuthController {
   // @desc    Register user
   // @route   POST /api/auth/register
   // @access  Public
   register = asyncHandler(async (req, res) => {
      try {
         const user = await authService.create(req.body);
         this.sendTokenResponse(user, 201, res);
      } catch (error) {
         throw new InternalServerException(error.message);
      }
   });

   // @desc    Login user
   // @route   POST /api/auth/login
   // @access  Public
   login = asyncHandler(async (req, res) => {
      const { email, password } = req.body;

      if (!email || !password) {
         throw new BadRequestException('Please provide an email and password');
      }

      try {
         const user = await authService.login(email, password);
         this.sendTokenResponse(user, 200, res);
      } catch (error) {
         throw new UnAuthorizedException(error.message);
      }
   });

   // @desc    Refresh token
   // @route   POST /api/auth/refresh
   // @access  Public
   refresh = asyncHandler(async (req, res) => {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
         throw new UnAuthorizedException('Refresh token not found');
      }

      try {
         const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
         const user = await authService.findById(decoded.id);

         if (!user) throw new UnAuthorizedException('User not found');

         this.sendTokenResponse(user, 200, res);
      } catch (error) {
         throw new UnAuthorizedException('Invalid refresh token');
      }
   });

   // @desc    Get current logged in user
   // @route   GET /api/auth/me
   // @access  Private
   getMe = asyncHandler(async (req, res) => {
      const user = await authService.findById(req.user.id);
      if (!user) throw new NotFoundException('User not found');
      res.status(200).json({ success: true, data: user });
   });

   // @desc    Forgot password
   // @route   POST /api/auth/forgot-password
   // @access  Public
   forgotPassword = asyncHandler(async (req, res) => {
      const { email } = req.body;

      if (!email) {
         throw new BadRequestException('Please provide an email');
      }

      try {
         const resetToken = await authService.forgotPassword(email);

         // Create reset url (pointing to frontend)
         const resetUrl = `${req.protocol}://${req.get('host').replace('5000', '5173')}/admin/reset-password/${resetToken}`;

         const message = `
            <h1>Password Reset Request</h1>
            <p>You are receiving this email because you (or someone else) have requested the reset of a password.</p>
            <p>Please click on the link below to reset your password:</p>
            <p><a href="${resetUrl}" target="_blank">${resetUrl}</a></p>
            <p>If you did not request this, please ignore this email.</p>
            <p>The link will expire in 10 minutes.</p>
         `;

         await sendEmail({
            to: email,
            subject: 'Portfolio Admin - Password Reset',
            html: message,
         });

         res.status(200).json({ success: true, data: 'Email sent successfully' });
      } catch (error) {
         throw new InternalServerException(error.message);
      }
   });

   // @desc    Reset password
   // @route   PUT /api/auth/reset-password/:resetToken
   // @access  Public
   resetPassword = asyncHandler(async (req, res) => {
      const { password } = req.body;
      const { resetToken } = req.params;

      if (!password) {
         throw new BadRequestException('Please provide a new password');
      }

      try {
         await authService.resetPassword(resetToken, password);
         res.status(200).json({ success: true, data: 'Password reset successful' });
      } catch (error) {
         throw new InternalServerException(error.message);
      }
   });

   // Helper: create tokens + send response
   sendTokenResponse = (user, statusCode, res) => {
      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
         expiresIn: process.env.JWT_ACCESS_EXPIRE,
      });

      const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
         expiresIn: process.env.JWT_REFRESH_EXPIRE,
      });

      const cookieOptions = {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'Lax',
      };

      res
         .status(statusCode)
         .cookie('refreshToken', refreshToken, {
            ...cookieOptions,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
         })
         .json({
            success: true,
            accessToken,
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
         });
   };
}

module.exports = new AuthController();
