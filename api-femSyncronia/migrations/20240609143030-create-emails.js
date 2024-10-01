'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('emails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      main: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      host: {
        type: Sequelize.STRING
      },
      port: {
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      encryption: {
        type: Sequelize.STRING
      },
      from_name: {
        type: Sequelize.STRING
      },
      from_address: {
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
    await queryInterface.dropTable('emails');
  }
};
