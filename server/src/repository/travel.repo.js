const BaseRepository = require('./base.repo');
const { Travel } = require('@/database/models');

class TravelRepository extends BaseRepository {
   constructor() {
      super(Travel, [['createdAt', 'DESC']]);
   }
}

module.exports = new TravelRepository();
