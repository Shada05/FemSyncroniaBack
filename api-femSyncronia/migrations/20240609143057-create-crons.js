'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('crons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      cron_status: {
        type: Sequelize.STRING
      },
      seconds: {
        type: Sequelize.STRING
      },
      minutes: {
        type: Sequelize.STRING
      },
      hours: {
        type: Sequelize.STRING
      },
      day_of_month: {
        type: Sequelize.STRING
        
      },
      day_of_week: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('crons');
  }
};