const BaseService = require('./base.service');
const projectRepository = require('@/repository/project.repo');

class ProjectService extends BaseService {
   constructor() {
      super(projectRepository);
   }
}

module.exports = new ProjectService();
