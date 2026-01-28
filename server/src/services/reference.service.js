const referenceRepository = require('../repositories/reference.repo');

class ReferenceService {
    async getAllReferences() {
        return await referenceRepository.findAll();
    }

    async addReference(data) {
        return await referenceRepository.create(data);
    }

    async updateReference(id, data) {
        return await referenceRepository.update(id, data);
    }

    async deleteReference(id) {
        return await referenceRepository.delete(id);
    }
}

module.exports = new ReferenceService();
