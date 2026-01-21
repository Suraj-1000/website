const Travel = require('../models/Travel');

class TravelRepository {
    async findAll() {
        return await Travel.findAll();
    }

    async create(data) {
        return await Travel.create(data);
    }
}

module.exports = new TravelRepository();
