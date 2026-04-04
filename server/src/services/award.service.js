const BaseService = require('./base.service');
const awardRepository = require('@/repositories/award.repo');

class AwardService extends BaseService {
   constructor() {
      super(awardRepository);
   }
}

module.exports = new AwardService();
