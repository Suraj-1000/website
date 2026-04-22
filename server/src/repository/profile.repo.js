const BaseRepository = require('./base.repo');
const { Profile } = require('@/database/models');

class ProfileRepository extends BaseRepository {
   constructor() {
      super(Profile);
   }
}

module.exports = new ProfileRepository();
