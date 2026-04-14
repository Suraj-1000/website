const BaseService = require('./base.service');
const experienceRepository = require('@/repository/experience.repo');

class ExperienceService extends BaseService {
   constructor() {
      super(experienceRepository);
   }
}

module.exports = new ExperienceService();
