const BaseService = require('./base.service');
const contactRepository = require('@/repository/contact.repo');

class ContactService extends BaseService {
   constructor() {
      super(contactRepository);
   }
}

module.exports = new ContactService();
