'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cycles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      cycle_status: {
        type: Sequelize.INTEGER // 1 = Activo, 2 = Predicción
      },
      weight: {
        type: Sequelize.FLOAT
      },
      temperature: {
        type: Sequelize.FLOAT
      },
      DM_1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      DM_2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      DM_3: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      DM_4: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      DM_5: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      DM_6: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      DM_7: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      DM_8: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      DM_9: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      DM_10: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      DM_11: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      DM_12: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      DM_13: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      DM_14: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      DM_15: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      DM_16: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      DM_17: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      DM_18: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      //Malestares
      M_1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_3: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_4: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_5: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_6: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_7: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_8: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_9: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_10: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_11: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_12: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_13: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_14: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_15: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_16: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_17: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_18: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_19: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      M_20: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },

      PP_1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      PP_2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      PP_3: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      PP_4: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      PP_5: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      //Emociones
      E_1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_3: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_4: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_5: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_6: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_7: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_8: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_9: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_10: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_11: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_12: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_13: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_14: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_15: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_16: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_17: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_18: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_19: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_20: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      E_21: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      //Fluidos
      F_1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      F_2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      F_3: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      F_4: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      F_5: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      F_6: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      F_7: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      F_8: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      F_9: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      F_10: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      F_11: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      F_12: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      F_13: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      F_14: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      F_15: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      AS_1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      AS_2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      AS_3: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      AS_4: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      AS_5: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      notes: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cycles');
  }
};