'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('languages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      proficiency: {
        type: Sequelize.ENUM('Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native'),
        allowNull: false,
        defaultValue: 'Intermediate',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('languages');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_languages_proficiency";');
  },
};
