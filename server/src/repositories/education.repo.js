const BaseRepository = require('./base.repo');
const { Education } = require('@/database/models');

class EducationRepository extends BaseRepository {
   constructor() {
      super(Education, [['startDate', 'DESC']]);
   }
}

module.exports = new EducationRepository();
