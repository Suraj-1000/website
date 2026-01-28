const awardRepository = require('../repositories/award.repo');

class AwardService {
    async getAllAwards() {
        return await awardRepository.findAll();
    }

    async addAward(data) {
        return await awardRepository.create(data);
    }

    async updateAward(id, data) {
        return await awardRepository.update(id, data);
    }

    async deleteAward(id) {
        return await awardRepository.delete(id);
    }
}

module.exports = new AwardService();
