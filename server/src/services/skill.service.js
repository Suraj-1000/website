const skillRepository = require('../repositories/skill.repo');

class SkillService {
    async getAllSkills() {
        return await skillRepository.findAll();
    }

    async getSkillById(id) {
        return await skillRepository.findById(id);
    }

    async createSkill(data) {
        return await skillRepository.create(data);
    }

    async updateSkill(id, data) {
        return await skillRepository.update(id, data);
    }

    async deleteSkill(id) {
        return await skillRepository.delete(id);
    }
}

module.exports = new SkillService();
