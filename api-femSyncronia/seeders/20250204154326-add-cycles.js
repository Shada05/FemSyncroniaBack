"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("cycles", [
      {
        cycle_status: 1,
        user_id: 3,
        weight: 60,
        temperature: 36.5,
        date: "2022-02-04",
        DM_1: 1,
        DM_2: 3,
        DM_3: 4,
        DM_4: 1,
        DM_5: 1,
        DM_6: 1,
        DM_7: 3,
        DM_8: 4,
        DM_9: 1,
        DM_10: 1,
        DM_11: 5,
      },
      {
        cycle_status: 1,
        user_id: 3,
        weight: 60,
        temperature: 36.5,
        date: "2022-02-05",
        DM_1: 1,
        DM_2: 3,
        DM_3: 4,
        DM_4: 1,
        DM_5: 1,
        DM_6: 0,
        DM_7: 3,
        DM_8: 0,
        DM_9: 1,
        DM_10: 1,
        DM_11: 5,
      },
      {
        cycle_status: 1,
        user_id: 3,
        weight: 60,
        temperature: 36.5,
        date: "2022-04-06",
        DM_1: 1,
        DM_2: 3,
        DM_3: 4,
        DM_4: 1,
        DM_5: 1,
        DM_6: 1,
        DM_7: 3,
        DM_8: 4,
        DM_9: 1,
        DM_10: 1,
        DM_11: 5,
      },
      {
        cycle_status: 1,
        user_id: 3,
        weight: 60,
        temperature: 36.5,
        date: "2022-05-07",
        DM_1: 1,
        DM_2: 3,
        DM_3: 4,
        DM_4: 1,
        DM_5: 1,
        DM_6: 1,
        DM_7: 3,
        DM_8: 4,
        DM_9: 1,
        DM_10: 1,
        DM_11: 5,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cycles", null, {
      truncate: null,
    });
  },
};
