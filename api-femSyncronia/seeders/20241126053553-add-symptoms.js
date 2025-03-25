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
        "description": "Contracciones leves o dolorosas en el abdomen.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/01_corporales/S_01.png"
      },
      {
        "name": "Dolor en los pechos",
        "frequency": "0",
        "type" : "0",
        "description": "Sensación de molestia o dolor en las mamas.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/01_corporales/S_02.png"
      },
      {
        "name": "Sensibilidad mamarias",
        "frequency": "0",
        "type" : "0",
        "description": "Aumento en la sensibilidad o incomodidad en los senos.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/01_corporales/S_03.png"
      },
      {
        "name": "Dolor de pecho",
        "frequency": "0",
        "type" : "0",
        "description": "Dolor localizado en la zona. torácica.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/01_corporales/S_04.png"
      },
      {
        "name": "Dolor de cabeza",
        "frequency": "0",
        "type" : "0",
        "description": "Molestia o presión constante en la cabeza.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/01_corporales/S_05.png"
      },

      {
        "name": "Migraña",
        "frequency": "0",
        "type" : "0",
        "description": "Dolor intenso de cabeza con náuseas o sensibilidad.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/01_corporales/S_06.png"
      },
      {
        "name": "Hinchazón",
        "frequency": "0",
        "type" : "0",
        "description": "Sensación de inflamación molesta en el cuerpo.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/01_corporales/S_07.png"
      },
      {
        "name": "Dolor lumbar",
        "frequency": "0",
        "type" : "0",
        "description": "Molestia prolongada en la parte baja de la espalda.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/01_corporales/S_08.png"
      },
      {
        "name": "Dolor de espalda",
        "frequency": "0",
        "type" : "0",
        "description": "Dolor constante a lo largo de la espalda.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/01_corporales/S_09.png"
      },
      {
        "name": "Calambres abdominales",
        "frequency": "0",
        "type" : "0",
        "description": "Contracciones dolorosas repetitivas en el abdomen.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/01_corporales/S_10.png"
      },

      {
        "name": "Dolor en zona pelvica",
        "frequency": "0",
        "type" : "0",
        "description": "Molestia aguda en la región inferior del abdomen",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/01_corporales/S_11.png"
      },
      {
        "name": "Dolor muscular",
        "frequency": "0",
        "type" : "0",
        "description": "Sensación de molestia en los músculos",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/01_corporales/S_12.png"
      },
      {
        "name": "Dolor de piernas",
        "frequency": "0",
        "type" : "0",
        "description": "Dolor localizado en las extremidades inferiores.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/01_corporales/S_13.png"
      },
      {
        "name": "Calambres",
        "frequency": "0",
        "type" : "0",
        "description": "Contracciones dolorosas súbitas en los músculos.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/01_corporales/S_14.png"
      },
      {
        "name": "Dolor en las articulaciones",
        "frequency": "0",
        "type" : "0",
        "description": "Molestia en las uniones óseas",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/01_corporales/S_15.png"
      },

      {
        "name": "Dolor en extremidades",
        "frequency": "0",
        "type" : "0",
        "description": "Dolor generalizado en brazos o piernas.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/01_corporales/S_16.png"
      },
      {
        "name": "Dolor por ovulación",
        "frequency": "0",
        "type" : "0",
        "description": "Molestia puntual durante la liberación del óvulo.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/01_corporales/S_17.png"
      },
      {
        "name": "Dolores corporales",
        "frequency": "0",
        "type" : "0",
        "description": "Sensación de incomodidad en todo el cuerpo.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/01_corporales/S_18.png"
      },
      {//Aquí termina los dolores musculares e inica malestares
        "name": "Gripe",
        "frequency": "0",
        "type" : "1",
        "description": "Congestión nasal y malestar por infección respiratoria.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_19.png"
      },
      {
        "name": "Escalofríos",
        "frequency": "0",
        "type" : "1",
        "description": "Sensación de frío con temblores corporales.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_20.png"
      },
      {
        "name": "Fiebre",
        "frequency": "0",
        "type" : "1",
        "description": "Elevación de la temperatura corporal anormal.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_21.png"
      },
      {
        "name": "Mareos",
        "frequency": "0",
        "type" : "1",
        "description": "Sensación de inestabilidad o vértigo repentino.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_22.png"
      },
      {
        "name": "Náuseas",
        "frequency": "0",
        "type" : "1",
        "description": "Malestar estomacal con deseo de vomitar.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_23.png"
      },
      {
        "name": "Vómitos",
        "frequency": "0",
        "type" : "1",
        "description": "Expulsión forzada del contenido estomacal.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_24.png"
      },
      {
        "name": "Diarrea",
        "frequency": "0",
        "type" : "1",
        "description": "Heces líquidas frecuentes y dolor abdominal.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_25.png"
      },
      {
        "name": "Estreñimiento",
        "frequency": "0",
        "type" : "1",
        "description": "Dificultad para evacuar con frecuencia normal.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_26.png"
      },
      {
        "name": "Dispepsia",
        "frequency": "0",
        "type" : "1",
        "description": "Malestar digestivo en la parte alta del abdomen.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_27.png"
      },
      {
        "name": "Gases",
        "frequency": "0",
        "type" : "1",
        "description": "Acumulación de aire en el sistema digestivo.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_28.png"
      },
      {
        "name": "Fatiga",
        "frequency": "0",
        "type" : "1",
        "description": "Pérdida de fuerza física o energía general.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_29.png"
      },
      {
        "name": "Insomnio",
        "frequency": "0",
        "type" : "1",
        "description": "Dificultad persistente para conciliar o mantener el sueño.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_30.png"
      },
      {
        "name": "Antojos",
        "frequency": "0",
        "type" : "1",
        "description": "Deseo repentino e intenso de ciertos alimentos.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_31.png"
      },
      {
        "name": "Exceso de apetito",
        "frequency": "0",
        "type" : "1",
        "description": "Aumento inusual y constante del hambre.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_32.png"
      },
      {
        "name": "Falta de apetito",
        "frequency": "0",
        "type" : "1",
        "description": "Reducción significativa en el deseo de comer.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_33.png"
      },
      
      {
        "name": "Aumento de peso",
        "frequency": "0",
        "type" : "1",
        "description": "Incremento visible en la masa corporal.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_34.png"
      },
      {
        "name": "Sudoración",
        "frequency": "0",
        "type" : "1",
        "description": "Producción excesiva de sudor sin motivo claro.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_35.png"
      },
      {
        "name": "Sofocos",
        "frequency": "0",
        "type" : "1",
        "description": "Calor repentino y extremo, a menudo con sudoración.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_36.png"
      },
      {
        "name": "Dificultad para respirar",
          "frequency": "0",
        "type" : "1",
        "description": "Sensación de esfuerzo o incapacidad para inhalar aire.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_37.png"
      },
      {
        "name": "Palpitaciones",
        "frequency": "0",
        "type" : "1",
        "description": "Latidos cardíacos fuertes, rápidos o irregulares.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/02_malestares/S_38.png"
      },
       //Aquí termina los malestares e inicia los problemas de piel
      {
        "name": "Acné",
        "frequency": "0",
        "type" : "2",
        "description": "Brotes de granos o protuberancias en la piel.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/03_piel/S_39.png"
      },
      {
        "name": "Picazón",
        "frequency": "0",
        "type" : "2",
        "description": "Sensación molesta que provoca ganas de rascarse.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/03_piel/S_40.png"
      },
      {
        "name": "Erupciones",
        "frequency": "0",
        "type" : "2",
        "description": "Erupciones cutáneas con enrojecimiento o inflamación.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/03_piel/S_41.png"
      },
      {
        "name": "Irritación",
        "frequency": "0",
        "type" : "2",
        "description": "Enrojecimiento o molestia en la piel.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/03_piel/S_42.png"
      },
      {
        "name": "Sequedad",
        "frequency": "0",
        "type" : "2",
        "description": "Relacionada con piel áspera o deshidratada.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/03_piel/S_43.png"
      },//Aquí termina los problemas de piel e inicia las emociones
      {
        "name": "feliz",
        "frequency": "0",
        "type" : "3",
        "description" : "Plenitud y alegría en el momento presente.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_44.png"
      },
      {
        "name": "alegre",
        "frequency": "0",
        "type" : "3",
        "description" : "Estado de felicidad y entusiasmo.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_45.png"
      },
      {
        "name": "orgullosa",
        "frequency": "0",
        "type" : "3",
        "description" : "Satisfacción personal por logros propios.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_46.png"
      },
      {
        "name": "tranquila",
        "frequency": "0",
        "type" : "3",
        "description" : "Estado de calma y relajación.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_47.png"
      },
      {
        "name": "neutral",
        "frequency": "0",
        "type" : "3",
        "description" : "Ausencia de emoción o preferencia.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_48.png"
      },
      {
        "name": "triste",
        "frequency": "0",
        "type" : "3",
        "description" : "Sentimiento de melancolía o pesar.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_49.png"
      },
      {
        "name": "deprimida",
        "frequency": "0",
        "type" : "3",
        "description" : "Estado persistente de tristeza y desmotivación.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_50.png"
      },
      {
        "name": "enojada",
        "frequency": "0",
        "type" : "3",
        "description" : "Sentimiento de irritación intensa o desagrado",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_51.png"
      },
      {
        "name": "irritada",
        "frequency": "0",
        "type" : "3",
        "description" : "Reacción fácil hacia el enojo o incomodidad.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_52.png"
      },
      {
        "name": "sensible",
        "frequency": "0",
        "type" : "3",
        "description" : " Propensa a reaccionar emocionalmente con facilidad.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_53.png"
      },
      {
        "name": "tensa",
        "frequency": "0",
        "type" : "3",
        "description" : "Sensación de rigidez física o emocional.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_54.png"
      },
      {
        "name": "rara",
        "frequency": "0",
        "type" : "3",
        "description" : "Sensación de ser diferente o inusual.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_55.png"
      },
      {
        "name": "estresada",
        "frequency": "0",
        "type" : "3",
        "description" : "Sensación de presión o tensión emocional.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_56.png"
      },
      {
        "name": "ansiosa",
        "frequency": "0",
        "type" : "3",
        "description" : "Sensación de nerviosismo o inquietud.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_57.png"
      },
      {
        "name": "angustiada",
        "frequency": "0",
        "type" : "3",
        "description" : "Ansiedad o preocupación extrema.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_58.png"
      },
      {
        "name": "insegura",
        "frequency": "0",
        "type" : "3",
        "description" : "Sentimiento de duda sobre si misma o su entorno.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_59.png"
      },
      {
        "name": "distraída",
        "frequency": "0",
        "type" : "3",
        "description" : "Falta de concentración por pensamientos o cosas externos.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_60.png"
      },
      {
        "name": "olvidadiza",
        "frequency": "0",
        "type" : "3",
        "description" : "Tendencia a no recordar cosas fácilmente.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_61.png"
      },
      {
        "name": "exhausta",
        "frequency": "0",
        "type" : "3",
        "description" : "Sentirse físicamente y mentalmente agotada.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_62.png"
      },
      {
        "name": "libidinosa",
        "frequency": "0",
        "type" : "3",
        "description" : "Sentimiento fuerte de deseo físico.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_63.png"
      },
      {
        "name": "coqueta",
        "frequency": "0",
        "type" : "3",
        "description" : "Sensación de seguridad y atractivo, con deseo de interactuar de manera romántica.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/04_emociones/S_64.png"
      },

      {//Aquí termina las emociones e inician los fluidos
        "name": "Abertura cervical",
        "frequency": "0",
        "type" : "4",
        "description" : "Apertura o dilatación del cuello uterino.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/05_fluidos/65.png"

      },
      {
        "name": "Flujo cervical",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción vaginal producida por el cuello uterino.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/05_fluidos/66.png"
      },
      {
        "name": "Firmeza cervical",
        "frequency": "0",
        "type" : "4",
        "description" : "Consistencia del cuello uterino, de suave a dura.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/05_fluidos/67.png"
      },
      {
        "name": "Fluido seco",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción cervical escasa o ausente.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/05_fluidos/68.png"
      },
      {
        "name": "Fluido pegajoso",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción viscosa y espesa.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/05_fluidos/69.png"
      },
      {
        "name": "Fluido cremoso",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción espesa y de textura similar a la crema.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/05_fluidos/70.png"
      },
      {
        "name": "Fluido acuoso",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción líquida y transparente.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/05_fluidos/71.png"
      },
      {
        "name": "Fluido clara de huevo",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción elástica y resbaladiza similar a la clara de huevo.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/05_fluidos/72.png"
      },
      {
        "name": "Fluido requesón",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción espesa, grumosa, similar al queso.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/05_fluidos/73.png"
      },
      {
        "name": "Fluido verde",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción de color verde, generalmente por infección.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/05_fluidos/74.png"
      },
      {
        "name": "Fluido con sangre",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción que contiene sangre, de aspecto rojizo.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/05_fluidos/75.png"
      },
      {
        "name": "Fluido con mal olor",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción vaginal con un olor desagradable.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/05_fluidos/76.png"
      },
      {
        "name": "Retención de líquidos",
        "frequency": "0",
        "type" : "4",
        "description" : "Acumulación anormal de líquidos en el cuerpo.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/05_fluidos/77.png"
      },
      {
        "name": "Manchado",
        "frequency": "0",
        "type" : "4",
        "description" : "Sangrado leve o irregular fuera del período.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/05_fluidos/78.png"
      },
      {
        "name": "Sangrado",
        "frequency": "0",
        "type" : "4",
        "description" : "Pérdida de sangre, generalmente más abundante.",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/05_fluidos/79.png"
      },
      //Aqui empiezan preguntas sobre actos sexuales
      {
        "name": "Relacion sexual",
        "frequency": "0",
        "type" : "5",
        "description" : "Si tiene acto sexual o no",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/06_acto/80.png"
      },
      {
        "name": "Relacion sexual con protección",
        "frequency": "0",
        "type" : "5",
        "description" : "si uso proteccion o no en el acto",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/06_acto/81.png"
      },
      {
        "name": "Orgasmo",
        "frequency": "0",
        "type" : "5",
        "description" : "orgasmo ",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/06_acto/82.png"
      },
      {
        "name": "Ocasiones que lo hizo",
        "frequency": "0",
        "type" : "5",
        "description" : "cantidad de heces que lo hizo",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/06_acto/83.png"
      },
      {
        "name": "Personas con las que lo hizo",
        "frequency": "0",
        "type" : "5",
        "description": "cantidad de personas con las que lo hizo",
        "image": "https://femsyncronia.onrender.com/iconos/sintomas/06_acto/84.png"
        }

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("symtoms", null, {
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