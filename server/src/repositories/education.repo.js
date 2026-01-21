const Education = require('../models/Education');

class EducationRepository {
    async findAll() {
        return await Education.findAll({ order: [['graduationYear', 'DESC']] });
    }

    async create(educationData) {
        return await Education.create(educationData);
    }

    // Add updated/delete/findById as needed
}

module.exports = new EducationRepository();
