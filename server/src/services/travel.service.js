const BaseService = require('./base.service');
const travelRepository = require('@/repositories/travel.repo');

class TravelService extends BaseService {
   constructor() {
      super(travelRepository);
   }
}

module.exports = new TravelService();
