"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("cycles", [
      {
        cycle_status: 1,
        user_id: 1,
        weight: 60,
        temperature: 36.5,
        //Problemas en la piel
        PP_1: 3, // Acne
        PP_2: 3, //picazon
        PP_3: 3, //Salpullidos
        PP_4: 3, //Irritacion

        //Dolores musculares
        DM_1: 3, //Colicos
        DM_4: 3, //Dolor de pecho
        DM_3: 3, //Sensibilidad mamaria
        DM_2: 3, //Dolor en los pechos
        DM_5: 0, //Dolor de cabeza
        DM_6: 0, //Migraña
        DM_7: 3, //Hinchazon
        DM_8: 0, //Dolor lumbar
        DM_9: 3, //Dolor de espalda
        DM_10: 0, // Calambre abdominales
        DM_11: 3, //Dolor en la zona pelvica
        DM_12: 0, // Dolor muscular
        DM_13: 0, // Dolor de piernas
        DM_14: 0, //calambres
        DM_15: 0, //Dolor de articulaciones
        DM_16: 0, //Dolor de extremidades
        DM_17: 3, //Dolor de ovulacion
        DM_18: 0, //Dolores corporales
        //Emociones
        M_1: 3, //Irritabilidad

      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cycles", null, {
      truncate: null,
    });
  },
};
