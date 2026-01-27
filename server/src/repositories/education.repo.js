const Education = require('../models/Education');

class EducationRepository {
    async findAll() {
        return await Education.findAll({ order: [['year', 'DESC']] });
    }

    async findById(id) {
        return await Education.findByPk(id);
    }

    async create(educationData) {
        return await Education.create(educationData);
    }

    async update(id, data) {
        const education = await this.findById(id);
        if (education) {
            return await education.update(data);
        }
        return null;
    }

    async delete(id) {
        const education = await this.findById(id);
        if (education) {
            return await education.destroy();
        }
        return null;
    }
}

module.exports = new EducationRepository();
