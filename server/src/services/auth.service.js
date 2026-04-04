const BaseService = require('./base.service');
const userRepository = require('@/repositories/user.repo');

class AuthService extends BaseService {
   constructor() {
      super(userRepository);
   }

   async login(email, password) {
      const user = await this.repository.findByEmail(email);
      if (!user) throw new Error('Invalid credentials');

      const isMatch = await user.matchPassword(password);
      if (!isMatch) throw new Error('Invalid credentials');

      return user;
   }

   async findByEmail(email) {
      return await this.repository.findByEmail(email);
   }
}

module.exports = new AuthService();
