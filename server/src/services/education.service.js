const educationRepository = require('../repositories/education.repo');

class EducationService {
    async getAllEducations() {
        // Add logic like formatting or filtering if needed
        return await educationRepository.findAll();
    }

    async addEducation(data) {
        return await educationRepository.create(data);
    }
}

module.exports = new EducationService();
