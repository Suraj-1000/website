const educationRepository = require('../repositories/education.repo');

class EducationService {
    async getAllEducations() {
        return await educationRepository.findAll();
    }

    async addEducation(data) {
        return await educationRepository.create(data);
    }

    async updateEducation(id, data) {
        return await educationRepository.update(id, data);
    }

    async deleteEducation(id) {
        return await educationRepository.delete(id);
    }
}

module.exports = new EducationService();
