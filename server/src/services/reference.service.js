const BaseService = require('./base.service');
const referenceRepository = require('@/repository/reference.repo');

class ReferenceService extends BaseService {
   constructor() {
      super(referenceRepository);
   }
}

module.exports = new ReferenceService();
