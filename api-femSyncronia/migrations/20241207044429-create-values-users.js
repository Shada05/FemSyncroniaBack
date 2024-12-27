'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('values_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
      id_user: { 
        type: Sequelize.INTEGER
    },
      weight: {
        type: Sequelize.INTEGER
    },
      temperature: {
        type: Sequelize.INTEGER
    },
      height: {
        type: Sequelize.INTEGER
    },
      created_at: {
        type: Sequelize.DATE
    },
      update_at: {
        type: Sequelize.DATE
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('values_users');
  }
};