const BaseService = require('./base.service');
const projectRepository = require('@/repositories/project.repo');

class ProjectService extends BaseService {
   constructor() {
      super(projectRepository);
   }
}

module.exports = new ProjectService();
