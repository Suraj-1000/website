const BaseService = require('./base.service');
const educationRepository = require('@/repositories/education.repo');

class EducationService extends BaseService {
   constructor() {
      super(educationRepository);
   }
}

module.exports = new EducationService();
