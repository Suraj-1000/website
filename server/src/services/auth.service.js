const BaseService = require('./base.service');
const userRepository = require('@/repository/user.repo');
const crypto = require('crypto');
const { Op } = require('sequelize');
const { UnAuthorizedException, NotFoundException, BadRequestException } = require('../exceptions/error.exception');

class AuthService extends BaseService {
   constructor() {
      super(userRepository);
   }

   login = async (email, password) => {
      const user = await this.repository.findByEmail(email);
      if (!user) throw new UnAuthorizedException('Invalid credentials');

      const isMatch = await user.matchPassword(password);
      if (!isMatch) throw new UnAuthorizedException('Invalid credentials');

      return user;
   };

   findByEmail = async (email) => {
      return await this.repository.findByEmail(email);
   };

   forgotPassword = async (email) => {
      const user = await this.repository.findByEmail(email);
      if (!user) throw new NotFoundException('User with this email not found');

      const resetToken = user.getResetPasswordToken();
      await user.save();

      return resetToken;
   };

   resetPassword = async (resetToken, password) => {
      const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

      const user = await this.repository.findOne({
         resetPasswordToken: hashedToken,
         resetPasswordExpire: { [Op.gt]: Date.now() }
      });

      if (!user) throw new BadRequestException('Invalid or expired reset token');

      // Set new password
      user.password = password;
      user.resetPasswordToken = null;
      user.resetPasswordExpire = null;

      await user.save();

      return user;
   };
}

module.exports = new AuthService();
