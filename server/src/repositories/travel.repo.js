const { Travel } = require('@/database/models');

class TravelRepository {
    async findAll() {
        return await Travel.findAll();
    }

    async create(data) {
        return await Travel.create(data);
    }
}

module.exports = new TravelRepository();
