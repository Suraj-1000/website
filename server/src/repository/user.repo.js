const BaseRepository = require('./base.repo');
const { User } = require('@/database/models');

class UserRepository extends BaseRepository {
   constructor() {
      super(User, [['createdAt', 'DESC']]);
   }

   // Custom method: find user by email for auth
   findByEmail = async (email) => {
      return await this.findOne({ email });
   };
}

module.exports = new UserRepository();
