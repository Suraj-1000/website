const BaseService = require('./base.service');
const referenceRepository = require('@/repositories/reference.repo');

class ReferenceService extends BaseService {
   constructor() {
      super(referenceRepository);
   }
}

module.exports = new ReferenceService();
