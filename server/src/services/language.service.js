const languageRepository = require('../repositories/language.repo');

class LanguageService {
    async getAllLanguages() {
        return await languageRepository.findAll();
    }

    async addLanguage(data) {
        return await languageRepository.create(data);
    }

    async updateLanguage(id, data) {
        return await languageRepository.update(id, data);
    }

    async deleteLanguage(id) {
        return await languageRepository.delete(id);
    }
}

module.exports = new LanguageService();
