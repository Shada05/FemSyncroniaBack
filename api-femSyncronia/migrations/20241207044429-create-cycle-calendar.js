'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cycle_calendar', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    cycle_status: { 
        type: Sequelize.INTEGER
    },
    Start_day: {
        type: Sequelize.DATE
    },
    Finish_day: {
        type: Sequelize.DATE
    },
    average_periodo: {
        type: Sequelize.DATE
    },
    average_ciclo: {
      type: Sequelize.DATE
    },
    Regular_cycle: {
    type: Sequelize.INTEGER
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
    await queryInterface.dropTable('cycle_calendar');
  }
};