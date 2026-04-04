const BaseService = require('./base.service');
const experienceRepository = require('@/repositories/experience.repo');

class ExperienceService extends BaseService {
   constructor() {
      super(experienceRepository);
   }
}

module.exports = new ExperienceService();
