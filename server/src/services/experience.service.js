const experienceRepository = require('../repositories/experience.repo');

class ExperienceService {
    async getAllExperiences() {
        return await experienceRepository.findAll();
    }

    async getExperienceById(id) {
        return await experienceRepository.findById(id);
    }

    async createExperience(data) {
        return await experienceRepository.create(data);
    }

    async updateExperience(id, data) {
        return await experienceRepository.update(id, data);
    }

    async deleteExperience(id) {
        return await experienceRepository.delete(id);
    }
}

module.exports = new ExperienceService();
