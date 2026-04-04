const BaseRepository = require('./base.repo');
const { Experience } = require('@/database/models');

class ExperienceRepository extends BaseRepository {
   constructor() {
      super(Experience, [['createdAt', 'DESC']]);
   }
}

module.exports = new ExperienceRepository();
