const travelRepository = require('../repositories/travel.repo');

class TravelService {
    async getAllTravels() {
        return await travelRepository.findAll();
    }

    async addTravel(data) {
        return await travelRepository.create(data);
    }
}

module.exports = new TravelService();
