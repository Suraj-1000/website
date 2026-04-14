const BaseService = require('./base.service');
const educationRepository = require('@/repository/education.repo');

class EducationService extends BaseService {
   constructor() {
      super(educationRepository);
   }
}

module.exports = new EducationService();
