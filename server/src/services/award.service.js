const BaseService = require('./base.service');
const awardRepository = require('@/repository/award.repo');

class AwardService extends BaseService {
   constructor() {
      super(awardRepository);
   }
}

module.exports = new AwardService();
