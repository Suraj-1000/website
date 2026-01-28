const Reference = require('../models/Reference');

class ReferenceRepository {
    async findAll() {
        return await Reference.findAll();
    }

    async findById(id) {
        return await Reference.findByPk(id);
    }

    async create(data) {
        return await Reference.create(data);
    }

    async update(id, data) {
        const reference = await this.findById(id);
        if (reference) {
            return await reference.update(data);
        }
        return null;
    }

    async delete(id) {
        const reference = await this.findById(id);
        if (reference) {
            return await reference.destroy();
        }
        return null;
    }
}

module.exports = new ReferenceRepository();
