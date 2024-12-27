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
        "type" : "0",
        "description": "Contracciones leves o dolorosas en el abdomen."
      },
      {
        "name": "Dolor en los pechos",
        "frequency": "0",
        "type" : "0",
        "description": "Sensación de molestia o dolor en las mamas."
      },
      {
        "name": "Sensibilidad mamarias",
        "frequency": "0",
        "type" : "0",
        "description": "Aumento en la sensibilidad o incomodidad en los senos."
      },
      {
        "name": "Dolor de pecho",
        "frequency": "0",
        "type" : "0",
        "description": "Dolor localizado en la zona. torácica."
      },
      {
        "name": "Dolor de cabeza",
        "frequency": "0",
        "type" : "0",
        "description": "Molestia o presión constante en la cabeza."
      },

      {
        "name": "Migraña",
        "frequency": "0",
        "type" : "0",
        "description": "Dolor intenso de cabeza con náuseas o sensibilidad."
      },
      {
        "name": "Hinchazón",
        "frequency": "0",
        "type" : "0",
        "description": "Sensación de inflamación molesta en el cuerpo."
      },
      {
        "name": "Dolor lumbar",
        "frequency": "0",
        "type" : "0",
        "description": "Molestia prolongada en la parte baja de la espalda."
      },
      {
        "name": "Dolor de espalda",
        "frequency": "0",
        "type" : "0",
        "description": "Dolor constante a lo largo de la espalda."
      },
      {
        "name": "Calambres abdominales",
        "frequency": "0",
        "type" : "0",
        "description": "Contracciones dolorosas repetitivas en el abdomen."
      },

      {
        "name": "Dolor en zona pelvica",
        "frequency": "0",
        "type" : "0",
        "description": "Molestia aguda en la región inferior del abdomen"
      },
      {
        "name": "Dolor muscular",
        "frequency": "0",
        "type" : "0",
        "description": "Sensación de molestia en los músculos"
      },
      {
        "name": "Dolor de piernas",
        "frequency": "0",
        "type" : "0",
        "description": "Dolor localizado en las extremidades inferiores."
      },
      {
        "name": "Calambres",
        "frequency": "0",
        "type" : "0",
        "description": "Contracciones dolorosas súbitas en los músculos."
      },
      {
        "name": "Dolor en las articulaciones",
        "frequency": "0",
        "type" : "0",
        "description": "Molestia en las uniones óseas"
      },

      {
        "name": "Dolor en extremidades",
        "frequency": "0",
        "type" : "0",
        "description": "Dolor generalizado en brazos o piernas."
      },
      {
        "name": "Dolor por ovulación",
        "frequency": "0",
        "type" : "0",
        "description": "Molestia puntual durante la liberación del óvulo."
      },
      {
        "name": "Dolores corporales",
        "frequency": "0",
        "type" : "0",
        "description": "Sensación de incomodidad en todo el cuerpo."
      },
      {//Aquí termina los dolores musculares e inica malestares
        "name": "Gripe",
        "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Escalofríos",
        "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Fiebre",
        "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Mareos",
        "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Náuseas",
        "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Vómitos",
        "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Diarrea",
        "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Estreñimiento",
        "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Dispepsia",
        "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Gases",
        "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Fatiga",
        "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Antojos",
        "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Falta de apetito",
        "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Exceso de apetito",
        "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Subida de peso",
        "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Sensación de debilidad",
        "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Sudoración",
        "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Dificultad para respirar",
          "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Palpitaciones",
        "frequency": "0",
        "type" : "1",
        "description": ""
      },
      {
        "name": "Sofocos",
        "frequency": "0",
        "type" : "1",
        "description": ""
      }, //Aquí termina los malestares e inicia los problemas de piel
      {
        "name": "Acné",
        "frequency": "0",
        "type" : "2",
        "description": ""
      },
      {
        "name": "Picazón",
        "frequency": "0",
        "type" : "2",
        "description": ""
      },
      {
        "name": "Sarpullido",
        "frequency": "0",
        "type" : "2",
        "description": ""
      },
      {
        "name": "Irritación",
        "frequency": "0",
        "type" : "2",
        "description": ""
      },//Aquí termina los problemas de piel e inicia las emociones
      {
        "name": "Cambios de humor",
        "frequency": "0",
        "type" : "3",
        "description" : "" 
      },
      {
        "name": "Insomnio",
        "frequency": "0",
        "type" : "3",
        "description" : "" 
      },
      {
        "name": "Depresión",
        "frequency": "0",
        "type" : "3",
        "description" : "" 
      },
      {
        "name": "Irritabilidad",
        "frequency": "0",
        "type" : "3",
        "description" : "" 
      },
      {
        "name": "falta de atención",
        "frequency": "0",
        "type" : "3",
        "description" : "" 
      },
      {
        "name": "Confusión mental",
        "frequency": "0",
        "type" : "3",
        "description" : "" 
      },
      {
        "name": "Tensión",
        "frequency": "0",
        "type" : "3",
        "description" : "" 
      },
      {
        "name": "Estrés",
        "frequency": "0",
        "type" : "3",
        "description" : "" 
      },
      {
        "name": "Ansiedad",
        "frequency": "0",
        "type" : "3",
        "description" : "" 
      },
      {//Aquí termina las emociones e inician los fluidos
        "name": "Abertura cervical",
        "frequency": "0",
        "type" : "4",
        "description" : ""
      },
      {
        "name": "Flujo cervical",
        "frequency": "0",
        "type" : "4",
        "description" : ""
      },
      {
        "name": "Firmeza cervical",
        "frequency": "0",
        "type" : "4",
        "description" : ""
      },
      {
        "name": "Fluido seco",
        "frequency": "0",
        "type" : "4",
        "description" : ""
      },
      {
        "name": "Fluido pegajoso",
        "frequency": "0",
        "type" : "4",
        "description" : ""
      },
      {
        "name": "Fluido cremoso",
        "frequency": "0",
        "type" : "4",
        "description" : ""
      },
      {
        "name": "Fluido acuoso",
        "frequency": "0",
        "type" : "4",
        "description" : ""
      },
      {
        "name": "Fluido clara de huevo",
        "frequency": "0",
        "type" : "4",
        "description" : ""
      },
      {
        "name": "Fluido requesón",
        "frequency": "0",
        "type" : "4",
        "description" : ""
      },
      {
        "name": "Fluido verde",
        "frequency": "0",
        "type" : "4",
        "description" : ""
      },
      {
        "name": "Fluido con sangre",
        "frequency": "0",
        "type" : "4",
        "description" : ""
      },
      {
        "name": "Fluido con mal olor",
        "frequency": "0",
        "type" : "4",
        "description" : ""
      },
      {
        "name": "Desmayos",
        "frequency": "0",
        "type" : "4",
        "description" : ""
      },
      {
        "name": "Retención de líquidos",
        "frequency": "0",
        "type" : "4",
        "description" : ""
      },
      {
        "name": "Manchado",
        "frequency": "0",
        "type" : "4",
        "description" : ""
      },
      {
        "name": "Sangrado",
        "frequency": "0",
        "type" : "4",
        "description" : ""
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