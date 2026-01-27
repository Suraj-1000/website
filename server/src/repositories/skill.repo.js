const Skill = require('../models/Skill');

class SkillRepository {
    async findAll() {
        return await Skill.findAll({ order: [['createdAt', 'ASC']] });
    }

    async findById(id) {
        return await Skill.findByPk(id);
    }

    async create(data) {
        return await Skill.create(data);
    }

    async update(id, data) {
        const skill = await this.findById(id);
        if (skill) {
            return await skill.update(data);
        }
        return null;
    }

    async delete(id) {
        const skill = await this.findById(id);
        if (skill) {
            return await skill.destroy();
        }
        return null;
    }
}

module.exports = new SkillRepository();
