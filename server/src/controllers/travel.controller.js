const travelService = require('../services/travel.service');

class TravelController {
    async getTravels(req, res) {
        try {
            const travels = await travelService.getAllTravels();
            res.status(200).json(travels);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createTravel(req, res) {
        try {
            const travel = await travelService.addTravel(req.body);
            res.status(201).json(travel);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new TravelController();
