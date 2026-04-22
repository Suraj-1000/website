const BaseService = require('./base.service');
const profileRepository = require('@/repository/profile.repo');

class ProfileService extends BaseService {
   constructor() {
      super(profileRepository);
   }

   // Overriding or adding a method to get the single profile (we only expect one)
   async getProfile() {
      const profiles = await this.findAll();
      return profiles[0] || null;
   }

   async upsertProfile(data) {
      const existing = await this.getProfile();
      if (existing) {
         return await this.update(existing.id, data);
      }
      return await this.create(data);
   }
}

module.exports = new ProfileService();
