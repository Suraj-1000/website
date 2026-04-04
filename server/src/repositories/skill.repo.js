const BaseRepository = require('./base.repo');
const { Skill } = require('@/database/models');

class SkillRepository extends BaseRepository {
   constructor() {
      super(Skill, [['createdAt', 'ASC']]);
   }
}

module.exports = new SkillRepository();
