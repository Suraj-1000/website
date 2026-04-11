'use strict';
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Suraj@1212', salt);

    await queryInterface.bulkInsert('users', [{
      id: crypto.randomUUID(),
      name: 'Suraj Kunwor',
      email: 'dsurajkunwor101@gmail.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { email: 'dsurajkunwor101@gmail.com' }, {});
  }
};
