"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("cycles", [
      {
        cycle_status: 1,
        user_id: 7,
        weight: 60,
        temperature: 36.5,
        date: "2025-02-01", // Fecha añadida
        //Problemas en la piel
        PP_1: 3, // Acne
        PP_2: 3, //picazon
        PP_3: 0, //Salpullidos
        PP_4: 0, //Irritacion

        //Dolores musculares
        DM_1: 3, //Colicos
        DM_4: 3, //Dolor de pecho
        DM_3: 3, //Sensibilidad mamaria
        DM_2: 0, //Dolor en los pechos
        DM_5: 3, //Dolor de cabeza
        DM_6: 3, //Migraña
        DM_7: 0, //Hinchazon
        DM_8: 3, //Dolor lumbar
        DM_9: 3, //Dolor de espalda
        DM_10: 0, // Calambre abdominales
        DM_11: 0, //Dolor en la zona pelvica
        DM_12: 0, // Dolor muscular
        DM_13: 3, // Dolor de piernas
        DM_14: 0, //calambres
        DM_15: 0, //Dolor de articulaciones
        DM_16: 0, //Dolor de extremidades
        DM_17: 3, //Dolor de ovulacion
        DM_18: 0, //Dolores corporales
        //Emociones
                //Cambios de humor
        E_2: 3, //Euforia - alegre
        M_12: 3,//Insomio
        E_7: 0, //Deprimida
        E_6: 0, //Triste
        E_9: 0, //Irritada
                //Frustacion 
        E_11: 0, //Tensa
        E_13: 0, //Estresada
        E_14: 0, //Ansiosa
        E_15: 0, //Angustida
        E_16: 0, //insegura
        E_10: 0, //Sensible
        E_20: 0, //libidinosa
                //Disminicion de deseo sexual
        
        //Malestares
        M_1: 3, //Gripe
        M_2: 0, //Escalofrios
        M_3: 0, //Fiebre
        M_4: 0, //Mareos
        M_5: 0, //Nauseas
        M_6: 0, //Vomitos
        M_7: 0, //Diarrea
        M_8: 0, //Estrenimiento
        M_9: 0, //Dispepsia
        M_10: 3, //Gases
        M_11: 3, //Fatiga
        M_13: 0, //Antojos
        M_15: 0, //Falta de apetito
        M_14: 0, //Exceso de apetito
        M_16: 0, //Aumento de peso
                 //Retencion de liquidos
                 //Sensacion de debilidad
                 //Desmayos
        M_17: 0, //Sudoracion
        M_19: 0, //Dificultad para respirar
        M_20: 0, //Palpitaciones
        M_18: 0, //sofocos
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cycles", null, {
      truncate: null,
    });
  },
};
