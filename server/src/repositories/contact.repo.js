const Contact = require('../models/Contact');

class ContactRepository {
    async create(data) {
        return await Contact.create(data);
    }

    async findAll() {
        return await Contact.findAll({
            order: [['createdAt', 'DESC']]
        });
    }

    async findById(id) {
        return await Contact.findByPk(id);
    }

    async updateStatus(id, status) {
        return await Contact.update({ status }, {
            where: { id }
        });
    }
}

module.exports = new ContactRepository();
