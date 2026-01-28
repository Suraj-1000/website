const Language = require('../models/Language');

class LanguageRepository {
    async findAll() {
        return await Language.findAll();
    }

    async findById(id) {
        return await Language.findByPk(id);
    }

    async create(data) {
        return await Language.create(data);
    }

    async update(id, data) {
        const language = await this.findById(id);
        if (language) {
            return await language.update(data);
        }
        return null;
    }

    async delete(id) {
        const language = await this.findById(id);
        if (language) {
            return await language.destroy();
        }
        return null;
    }
}

module.exports = new LanguageRepository();
