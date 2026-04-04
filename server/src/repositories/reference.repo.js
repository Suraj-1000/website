const BaseRepository = require('./base.repo');
const { Reference } = require('@/database/models');

class ReferenceRepository extends BaseRepository {
   constructor() {
      super(Reference, [['createdAt', 'DESC']]);
   }
}

module.exports = new ReferenceRepository();
