"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("symptoms", [
      /* type: 0 = Dolores musculares
         type: 1 = Malestares
         type: 2 = Problemas en la piel
         type: 3 = Emociones
         type: 4 = Fluidos
      */
      {//Aquí inicia los dolores musculares
        "name": "Colicos",
        "frequency": "0",
        "type" : "0"
      },
      {
        "name": "Dolor en los pechos",
        "frequency": "0",
        "type" : "0"
      },
      {
        "name": "Sensibilidad mamarias",
        "frequency": "0",
        "type" : "0"
      },
      {
        "name": "Dolor de pecho",
        "frequency": "0",
        "type" : "0"
      },
      {
        "name": "Dolor de cabeza",
        "frequency": "0",
        "type" : "0"
      },

      {
        "name": "Migraña",
        "frequency": "0",
        "type" : "0"
      },
      {
        "name": "Hinchazón",
        "frequency": "0",
        "type" : "0"
      },
      {
        "name": "Dolor lumbar",
        "frequency": "0",
        "type" : "0"
      },
      {
        "name": "Dolor de espalda",
        "frequency": "0",
        "type" : "0"
      },
      {
        "name": "Calambres abdominales",
        "frequency": "0",
        "type" : "0"
      },

      {
        "name": "Dolor en zona pelvica",
        "frequency": "0",
        "type" : "0"
      },
      {
        "name": "Dolor muscular",
        "frequency": "0",
        "type" : "0"
      },
      {
        "name": "Dolor de piernas",
        "frequency": "0",
        "type" : "0"
      },
      {
        "name": "Calambres",
        "frequency": "0",
        "type" : "0"
      },
      {
        "name": "Dolor en las articulaciones",
        "frequency": "0",
        "type" : "0"
      },

      {
        "name": "Dolor en extremidades",
        "frequency": "0",
        "type" : "0"
      },
      {
        "name": "Dolor por ovulación",
        "frequency": "0",
        "type" : "0"
      },
      {
        "name": "Dolores corporales",
        "frequency": "0",
        "type" : "0"
      },
      {//Aquí termina los dolores musculares e inica malestares
        "name": "Gripe",
        "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Escalofríos",
        "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Fiebre",
        "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Mareos",
        "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Náuseas",
        "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Vómitos",
        "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Diarrea",
        "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Estreñimiento",
        "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Dispepsia",
        "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Gases",
        "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Fatiga",
        "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Antojos",
        "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Falta de apetito",
        "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Exceso de apetito",
        "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Subida de peso",
        "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Sensación de debilidad",
        "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Sudoración",
        "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Dificultad para respirar",
          "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Palpitaciones",
        "frequency": "0",
        "type" : "1"
      },
      {
        "name": "Sofocos",
        "frequency": "0",
        "type" : "1"
      }, //Aquí termina los malestares e inicia los problemas de piel
      {
        "name": "Acné",
        "frequency": "0",
        "type" : "2"
      },
      {
        "name": "Picazón",
        "frequency": "0",
        "type" : "2"
      },
      {
        "name": "Sarpullido",
        "frequency": "0",
        "type" : "2"
      },
      {
        "name": "Irritación",
        "frequency": "0",
        "type" : "2"
      },//Aquí termina los problemas de piel e inicia las emociones
      {
        "name": "Cambios de humor",
        "frequency": "0",
        "type" : "3"
      },
      {
        "name": "Insomnio",
        "frequency": "0",
        "type" : "3"
      },
      {
        "name": "Depresión",
        "frequency": "0",
        "type" : "3"
      },
      {
        "name": "Irritabilidad",
        "frequency": "0",
        "type" : "3"
      },
      {
        "name": "falta de atención",
        "frequency": "0",
        "type" : "3"
      },
      {
        "name": "Confusión mental",
        "frequency": "0",
        "type" : "3"
      },
      {
        "name": "Tensión",
        "frequency": "0",
        "type" : "3"
      },
      {
        "name": "Estrés",
        "frequency": "0",
        "type" : "3"
      },
      {
        "name": "Ansiedad",
        "frequency": "0",
        "type" : "3"
      },
      {//Aquí termina las emociones e inician los fluidos
        "name": "Abertura cervical",
        "frequency": "0",
        "type" : "4"
      },
      {
        "name": "Flujo cervical",
        "frequency": "0",
        "type" : "4"
      },
      {
        "name": "Firmeza cervical",
        "frequency": "0",
        "type" : "4"
      },
      {
        "name": "Fluido seco",
        "frequency": "0",
        "type" : "4"
      },
      {
        "name": "Fluido pegajoso",
        "frequency": "0",
        "type" : "4"
      },
      {
        "name": "Fluido cremoso",
        "frequency": "0",
        "type" : "4"
      },
      {
        "name": "Fluido acuoso",
        "frequency": "0",
        "type" : "4"
      },
      {
        "name": "Fluido clara de huevo",
        "frequency": "0",
        "type" : "4"
      },
      {
        "name": "Fluido requesón",
        "frequency": "0",
        "type" : "4"
      },
      {
        "name": "Fluido verde",
        "frequency": "0",
        "type" : "4"
      },
      {
        "name": "Fluido con sangre",
        "frequency": "0",
        "type" : "4"
      },
      {
        "name": "Fluido con mal olor",
        "frequency": "0",
        "type" : "4"
      },
      {
        "name": "Desmayos",
        "frequency": "0",
        "type" : "4"
      },
      {
        "name": "Retención de líquidos",
        "frequency": "0",
        "type" : "4"
      },
      {
        "name": "Manchado",
        "frequency": "0",
        "type" : "4"
      },
      {
        "name": "Sangrado",
        "frequency": "0",
        "type" : "4"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("emails", null, {
      truncate: null,
    });
  },
};

/*Dolores musculares:
Cólicos
Dolor en los pechos
Sensibilidad mamaria
Dolor de pecho
Dolor de cabeza
Migraña
Hinchazón
Dolor lumbar
Dolor de espalda
Calambres abdominales
Dolor en la zona pélvica
Dolor muscular
Dolor de piernas
Calambres
Dolor de articulaciones
Dolor en las extremidades
Dolor por ovulación
Dolores corporales

Malestares:
Gripe
Escalofríos
Fiebre
Mareos
Náuseas
Vómitos
Diarrea
Estreñimiento
Dispepsia
Gases
Fatiga
Antojos
Falta de apetito
Exceso de apetito
Subida de peso
Sensación de debilidad
Sudoración
Dificultad para respirar
Palpitaciones
Sofocos

Problemas de piel:
Acné
Picazón
Sarpullidos
Irritación

Emociones:
Cambios de humor
Insomnio
Depresión
Irritabilidad
falta de atencion
Confusión mental
Tensión
Estrés
Ansiedad

Fluidos:
Abertura cervical
Flujo cervical
Firmeza cervical
Fluido seco
Fluido pegajoso
Fluido cremoso
Fluido acuoso
Fluido clara de huevo
Fluido requesón
Fluido verde
Fluido con sangre
Fluido con mal olor
Desmayos
Retención de líquidos
Manchado
Sangrado
*/