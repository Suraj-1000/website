const Award = require('../models/Award');

class AwardRepository {
    async findAll() {
        return await Award.findAll({ order: [['date', 'DESC']] });
    }

    async findById(id) {
        return await Award.findByPk(id);
    }

    async create(data) {
        return await Award.create(data);
    }

    async update(id, data) {
        const award = await this.findById(id);
        if (award) {
            return await award.update(data);
        }
        return null;
    }

    async delete(id) {
        const award = await this.findById(id);
        if (award) {
            return await award.destroy();
        }
        return null;
    }
}

module.exports = new AwardRepository();
