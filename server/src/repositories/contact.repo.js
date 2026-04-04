const BaseRepository = require('./base.repo');
const { Contact } = require('@/database/models');

class ContactRepository extends BaseRepository {
   constructor() {
      super(Contact, [['createdAt', 'DESC']]);
   }

   // Custom method: update only the status field
   async updateStatus(id, status) {
      return await this.model.update({ status }, { where: { id } });
   }
}

module.exports = new ContactRepository();
