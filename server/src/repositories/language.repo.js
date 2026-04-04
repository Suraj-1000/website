const BaseRepository = require('./base.repo');
const { Language } = require('@/database/models');

class LanguageRepository extends BaseRepository {
   constructor() {
      super(Language, [['createdAt', 'ASC']]);
   }
}

module.exports = new LanguageRepository();
