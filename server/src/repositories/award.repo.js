const BaseRepository = require('./base.repo');
const { Award } = require('@/database/models');

class AwardRepository extends BaseRepository {
   constructor() {
      super(Award, [['date', 'DESC']]);
   }
}

module.exports = new AwardRepository();
