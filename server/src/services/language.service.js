const BaseService = require('./base.service');
const languageRepository = require('@/repositories/language.repo');

class LanguageService extends BaseService {
   constructor() {
      super(languageRepository);
   }
}

module.exports = new LanguageService();
