const Experience = require('../models/Experience');

class ExperienceRepository {
    async findAll() {
        return await Experience.findAll({ order: [['createdAt', 'DESC']] });
    }

    async findById(id) {
        return await Experience.findByPk(id);
    }

    async create(data) {
        return await Experience.create(data);
    }

    async update(id, data) {
        const experience = await this.findById(id);
        if (experience) {
            return await experience.update(data);
        }
        return null;
    }

    async delete(id) {
        const experience = await this.findById(id);
        if (experience) {
            return await experience.destroy();
        }
        return null;
    }
}

module.exports = new ExperienceRepository();
