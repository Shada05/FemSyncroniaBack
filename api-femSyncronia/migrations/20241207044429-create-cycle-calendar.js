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
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Start_day: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    Finish_day: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    average_periodo: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    average_ciclo: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    Regular_cycle: {
    type: Sequelize.INTEGER,
    allowNull: false
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