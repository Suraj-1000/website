const BaseRepository = require('./base.repo');
const { Project } = require('@/database/models');

class ProjectRepository extends BaseRepository {
   constructor() {
      super(Project, [['createdAt', 'DESC']]);
   }
}

module.exports = new ProjectRepository();
