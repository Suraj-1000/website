const BaseService = require('./base.service');
const travelRepository = require('@/repository/travel.repo');

class TravelService extends BaseService {
   constructor() {
      super(travelRepository);
   }
}

module.exports = new TravelService();
