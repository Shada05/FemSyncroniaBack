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
        "image": "http://localhost:3000/iconos/sintomas/01.png"
      },
      {
        "name": "Dolor en los pechos",
        "frequency": "0",
        "type" : "0",
        "description": "Sensación de molestia o dolor en las mamas.",
        "image": "http://localhost:3000/iconos/sintomas/02.png"
      },
      {
        "name": "Sensibilidad mamarias",
        "frequency": "0",
        "type" : "0",
        "description": "Aumento en la sensibilidad o incomodidad en los senos.",
        "image": "http://localhost:3000/iconos/sintomas/03.png"
      },
      {
        "name": "Dolor de pecho",
        "frequency": "0",
        "type" : "0",
        "description": "Dolor localizado en la zona. torácica.",
        "image": "http://localhost:3000/iconos/sintomas/04.png"
      },
      {
        "name": "Dolor de cabeza",
        "frequency": "0",
        "type" : "0",
        "description": "Molestia o presión constante en la cabeza.",
        "image": "http://localhost:3000/iconos/sintomas/05.png"
      },

      {
        "name": "Migraña",
        "frequency": "0",
        "type" : "0",
        "description": "Dolor intenso de cabeza con náuseas o sensibilidad.",
        "image": "http://localhost:3000/iconos/sintomas/06.png"
      },
      {
        "name": "Hinchazón",
        "frequency": "0",
        "type" : "0",
        "description": "Sensación de inflamación molesta en el cuerpo.",
        "image": "http://localhost:3000/iconos/sintomas/07.png"
      },
      {
        "name": "Dolor lumbar",
        "frequency": "0",
        "type" : "0",
        "description": "Molestia prolongada en la parte baja de la espalda.",
        "image": "http://localhost:3000/iconos/sintomas/08.png"
      },
      {
        "name": "Dolor de espalda",
        "frequency": "0",
        "type" : "0",
        "description": "Dolor constante a lo largo de la espalda.",
        "image": "http://localhost:3000/iconos/sintomas/09.png"
      },
      {
        "name": "Calambres abdominales",
        "frequency": "0",
        "type" : "0",
        "description": "Contracciones dolorosas repetitivas en el abdomen.",
        "image": "http://localhost:3000/iconos/sintomas/10.png"
      },

      {
        "name": "Dolor en zona pelvica",
        "frequency": "0",
        "type" : "0",
        "description": "Molestia aguda en la región inferior del abdomen",
        "image": "http://localhost:3000/iconos/sintomas/11.png"
      },
      {
        "name": "Dolor muscular",
        "frequency": "0",
        "type" : "0",
        "description": "Sensación de molestia en los músculos",
        "image": "http://localhost:3000/iconos/sintomas/12.png"
      },
      {
        "name": "Dolor de piernas",
        "frequency": "0",
        "type" : "0",
        "description": "Dolor localizado en las extremidades inferiores.",
        "image": "http://localhost:3000/iconos/sintomas/13.png"
      },
      {
        "name": "Calambres",
        "frequency": "0",
        "type" : "0",
        "description": "Contracciones dolorosas súbitas en los músculos.",
        "image": "http://localhost:3000/iconos/sintomas/14.png"
      },
      {
        "name": "Dolor en las articulaciones",
        "frequency": "0",
        "type" : "0",
        "description": "Molestia en las uniones óseas",
        "image": "http://localhost:3000/iconos/sintomas/15.png"
      },

      {
        "name": "Dolor en extremidades",
        "frequency": "0",
        "type" : "0",
        "description": "Dolor generalizado en brazos o piernas.",
        "image": "http://localhost:3000/iconos/sintomas/16.png"
      },
      {
        "name": "Dolor por ovulación",
        "frequency": "0",
        "type" : "0",
        "description": "Molestia puntual durante la liberación del óvulo.",
        "image": "http://localhost:3000/iconos/sintomas/17.png"
      },
      {
        "name": "Dolores corporales",
        "frequency": "0",
        "type" : "0",
        "description": "Sensación de incomodidad en todo el cuerpo.",
        "image": "http://localhost:3000/iconos/sintomas/18.png"
      },
      {//Aquí termina los dolores musculares e inica malestares
        "name": "Gripe",
        "frequency": "0",
        "type" : "1",
        "description": "Congestión nasal y malestar por infección respiratoria.",
        "image": "http://localhost:3000/iconos/sintomas/19.png"
      },
      {
        "name": "Escalofríos",
        "frequency": "0",
        "type" : "1",
        "description": "Sensación de frío con temblores corporales.",
        "image": "http://localhost:3000/iconos/sintomas/20.png"
      },
      {
        "name": "Fiebre",
        "frequency": "0",
        "type" : "1",
        "description": "Elevación de la temperatura corporal anormal.",
        "image": "http://localhost:3000/iconos/sintomas/21.png"
      },
      {
        "name": "Mareos",
        "frequency": "0",
        "type" : "1",
        "description": "Sensación de inestabilidad o vértigo repentino.",
        "image": "http://localhost:3000/iconos/sintomas/22.png"
      },
      {
        "name": "Náuseas",
        "frequency": "0",
        "type" : "1",
        "description": "Malestar estomacal con deseo de vomitar.",
        "image": "http://localhost:3000/iconos/sintomas/23.png"
      },
      {
        "name": "Vómitos",
        "frequency": "0",
        "type" : "1",
        "description": "Expulsión forzada del contenido estomacal.",
        "image": "http://localhost:3000/iconos/sintomas/24.png"
      },
      {
        "name": "Diarrea",
        "frequency": "0",
        "type" : "1",
        "description": "Heces líquidas frecuentes y dolor abdominal.",
        "image": "http://localhost:3000/iconos/sintomas/25.png"
      },
      {
        "name": "Estreñimiento",
        "frequency": "0",
        "type" : "1",
        "description": "Dificultad para evacuar con frecuencia normal.",
        "image": "http://localhost:3000/iconos/sintomas/26.png"
      },
      {
        "name": "Dispepsia",
        "frequency": "0",
        "type" : "1",
        "description": "Malestar digestivo en la parte alta del abdomen.",
        "image": "http://localhost:3000/iconos/sintomas/27.png"
      },
      {
        "name": "Gases",
        "frequency": "0",
        "type" : "1",
        "description": "Acumulación de aire en el sistema digestivo.",
        "image": "http://localhost:3000/iconos/sintomas/28.png"
      },
      {
        "name": "Fatiga",
        "frequency": "0",
        "type" : "1",
        "description": "Pérdida de fuerza física o energía general.",
        "image": "http://localhost:3000/iconos/sintomas/29.png"
      },
      {
        "name": "Insomnio",
        "frequency": "0",
        "type" : "1",
        "description": "Dificultad persistente para conciliar o mantener el sueño.",
        "image": "http://localhost:3000/iconos/sintomas/30.png"
      },
      {
        "name": "Antojos",
        "frequency": "0",
        "type" : "1",
        "description": "Deseo repentino e intenso de ciertos alimentos.",
        "image": "http://localhost:3000/iconos/sintomas/31.png"
      },
      {
        "name": "Exceso de apetito",
        "frequency": "0",
        "type" : "1",
        "description": "Aumento inusual y constante del hambre.",
        "image": "http://localhost:3000/iconos/sintomas/32.png"
      },
      {
        "name": "Falta de apetito",
        "frequency": "0",
        "type" : "1",
        "description": "Reducción significativa en el deseo de comer.",
        "image": "http://localhost:3000/iconos/sintomas/33.png"
      },
      
      {
        "name": "Aumento de peso",
        "frequency": "0",
        "type" : "1",
        "description": "Incremento visible en la masa corporal.",
        "image": "http://localhost:3000/iconos/sintomas/34.png"
      },
      {
        "name": "Sudoración",
        "frequency": "0",
        "type" : "1",
        "description": "Producción excesiva de sudor sin motivo claro.",
        "image": "http://localhost:3000/iconos/sintomas/35.png"
      },
      {
        "name": "Sofocos",
        "frequency": "0",
        "type" : "1",
        "description": "Calor repentino y extremo, a menudo con sudoración.",
        "image": "http://localhost:3000/iconos/sintomas/36.png"
      },
      {
        "name": "Dificultad para respirar",
          "frequency": "0",
        "type" : "1",
        "description": "Sensación de esfuerzo o incapacidad para inhalar aire.",
        "image": "http://localhost:3000/iconos/sintomas/37.png"
      },
      {
        "name": "Palpitaciones",
        "frequency": "0",
        "type" : "1",
        "description": "Latidos cardíacos fuertes, rápidos o irregulares.",
        "image": "http://localhost:3000/iconos/sintomas/38.png"
      },
       //Aquí termina los malestares e inicia los problemas de piel
      {
        "name": "Acné",
        "frequency": "0",
        "type" : "2",
        "description": "Brotes de granos o protuberancias en la piel.",
        "image": "http://localhost:3000/iconos/sintomas/39.png"
      },
      {
        "name": "Picazón",
        "frequency": "0",
        "type" : "2",
        "description": "Sensación molesta que provoca ganas de rascarse.",
        "image": "http://localhost:3000/iconos/sintomas/40.png"
      },
      {
        "name": "Erupciones",
        "frequency": "0",
        "type" : "2",
        "description": "Erupciones cutáneas con enrojecimiento o inflamación.",
        "image": "http://localhost:3000/iconos/sintomas/40.png"
      },
      {
        "name": "Irritación",
        "frequency": "0",
        "type" : "2",
        "description": "Enrojecimiento o molestia en la piel.",
        "image": "http://localhost:3000/iconos/sintomas/41.png"
      },
      {
        "name": "Sequedad",
        "frequency": "0",
        "type" : "2",
        "description": "Relacionada con piel áspera o deshidratada.",
        "image": "http://localhost:3000/iconos/sintomas/42.png"
      },//Aquí termina los problemas de piel e inicia las emociones
      {
        "name": "feliz",
        "frequency": "0",
        "type" : "3",
        "description" : "Plenitud y alegría en el momento presente.",
        "image": "http://localhost:3000/iconos/sintomas/43.png"
      },
      {
        "name": "alegre",
        "frequency": "0",
        "type" : "3",
        "description" : "Estado de felicidad y entusiasmo.",
        "image": "http://localhost:3000/iconos/sintomas/44.png"
      },
      {
        "name": "orgullosa",
        "frequency": "0",
        "type" : "3",
        "description" : "Satisfacción personal por logros propios.",
        "image": "http://localhost:3000/iconos/sintomas/45.png"
      },
      {
        "name": "tranquila",
        "frequency": "0",
        "type" : "3",
        "description" : "Estado de calma y relajación.",
        "image": "http://localhost:3000/iconos/sintomas/46.png"
      },
      {
        "name": "neutral",
        "frequency": "0",
        "type" : "3",
        "description" : "Ausencia de emoción o preferencia.",
        "image": "http://localhost:3000/iconos/sintomas/47.png"
      },
      {
        "name": "triste",
        "frequency": "0",
        "type" : "3",
        "description" : "Sentimiento de melancolía o pesar.",
        "image": "http://localhost:3000/iconos/sintomas/48.png"
      },
      {
        "name": "deprimida",
        "frequency": "0",
        "type" : "3",
        "description" : "Estado persistente de tristeza y desmotivación.",
        "image": "http://localhost:3000/iconos/sintomas/49.png"
      },
      {
        "name": "enojada",
        "frequency": "0",
        "type" : "3",
        "description" : "Sentimiento de irritación intensa o desagrado",
        "image": "http://localhost:3000/iconos/sintomas/50.png"
      },
      {
        "name": "irritada",
        "frequency": "0",
        "type" : "3",
        "description" : "Reacción fácil hacia el enojo o incomodidad.",
        "image": "http://localhost:3000/iconos/sintomas/51.png"
      },
      {
        "name": "sensible",
        "frequency": "0",
        "type" : "3",
        "description" : " Propensa a reaccionar emocionalmente con facilidad.",
        "image": "http://localhost:3000/iconos/sintomas/52.png"
      },
      {
        "name": "tensa",
        "frequency": "0",
        "type" : "3",
        "description" : "Sensación de rigidez física o emocional.",
        "image": "http://localhost:3000/iconos/sintomas/53.png"
      },
      {
        "name": "rara",
        "frequency": "0",
        "type" : "3",
        "description" : "Sensación de ser diferente o inusual.",
        "image": "http://localhost:3000/iconos/sintomas/54.png"
      },
      {
        "name": "estresada",
        "frequency": "0",
        "type" : "3",
        "description" : "Sensación de presión o tensión emocional.",
        "image": "http://localhost:3000/iconos/sintomas/55.png"
      },
      {
        "name": "ansiosa",
        "frequency": "0",
        "type" : "3",
        "description" : "Sensación de nerviosismo o inquietud.",
        "image": "http://localhost:3000/iconos/sintomas/56.png"
      },
      {
        "name": "angustiada",
        "frequency": "0",
        "type" : "3",
        "description" : "Ansiedad o preocupación extrema.",
        "image": "http://localhost:3000/iconos/sintomas/57.png"
      },
      {
        "name": "insegura",
        "frequency": "0",
        "type" : "3",
        "description" : "Sentimiento de duda sobre si misma o su entorno.",
        "image": "http://localhost:3000/iconos/sintomas/58.png"
      },
      {
        "name": "distraída",
        "frequency": "0",
        "type" : "3",
        "description" : "Falta de concentración por pensamientos o cosas externos.",
        "image": "http://localhost:3000/iconos/sintomas/59.png"
      },
      {
        "name": "olvidadiza",
        "frequency": "0",
        "type" : "3",
        "description" : "Tendencia a no recordar cosas fácilmente.",
        "image": "http://localhost:3000/iconos/sintomas/60.png"
      },
      {
        "name": "exhausta",
        "frequency": "0",
        "type" : "3",
        "description" : "Sentirse físicamente y mentalmente agotada.",
        "image": "http://localhost:3000/iconos/sintomas/61.png"
      },
      {
        "name": "libidinosa",
        "frequency": "0",
        "type" : "3",
        "description" : "Sentimiento fuerte de deseo físico.",
        "image": "http://localhost:3000/iconos/sintomas/62.png"
      },
      {
        "name": "coqueta",
        "frequency": "0",
        "type" : "3",
        "description" : "Sensación de seguridad y atractivo, con deseo de interactuar de manera romántica.",
        "image": "http://localhost:3000/iconos/sintomas/63.png"
      },

      {//Aquí termina las emociones e inician los fluidos
        "name": "Abertura cervical",
        "frequency": "0",
        "type" : "4",
        "description" : "Apertura o dilatación del cuello uterino.",
        "image": "http://localhost:3000/iconos/sintomas/64.png"

      },
      {
        "name": "Flujo cervical",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción vaginal producida por el cuello uterino.",
        "image": "http://localhost:3000/iconos/sintomas/65.png"
      },
      {
        "name": "Firmeza cervical",
        "frequency": "0",
        "type" : "4",
        "description" : "Consistencia del cuello uterino, de suave a dura.",
        "image": "http://localhost:3000/iconos/sintomas/66.png"
      },
      {
        "name": "Fluido seco",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción cervical escasa o ausente.",
        "image": "http://localhost:3000/iconos/sintomas/67.png"
      },
      {
        "name": "Fluido pegajoso",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción viscosa y espesa.",
        "image": "http://localhost:3000/iconos/sintomas/68.png"
      },
      {
        "name": "Fluido cremoso",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción espesa y de textura similar a la crema.",
        "image": "http://localhost:3000/iconos/sintomas/69.png"
      },
      {
        "name": "Fluido acuoso",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción líquida y transparente.",
        "image": "http://localhost:3000/iconos/sintomas/70.png"
      },
      {
        "name": "Fluido clara de huevo",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción elástica y resbaladiza similar a la clara de huevo.",
        "image": "http://localhost:3000/iconos/sintomas/71.png"
      },
      {
        "name": "Fluido requesón",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción espesa, grumosa, similar al queso.",
        "image": "http://localhost:3000/iconos/sintomas/72.png"
      },
      {
        "name": "Fluido verde",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción de color verde, generalmente por infección.",
        "image": "http://localhost:3000/iconos/sintomas/73.png"
      },
      {
        "name": "Fluido con sangre",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción que contiene sangre, de aspecto rojizo.",
        "image": "http://localhost:3000/iconos/sintomas/74.png"
      },
      {
        "name": "Fluido con mal olor",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción vaginal con un olor desagradable.",
        "image": "http://localhost:3000/iconos/sintomas/75.png"
      },
      {
        "name": "Retención de líquidos",
        "frequency": "0",
        "type" : "4",
        "description" : "Acumulación anormal de líquidos en el cuerpo.",
        "image": "http://localhost:3000/iconos/sintomas/76.png"
      },
      {
        "name": "Manchado",
        "frequency": "0",
        "type" : "4",
        "description" : "Sangrado leve o irregular fuera del período.",
        "image": "http://localhost:3000/iconos/sintomas/77.png"
      },
      {
        "name": "Sangrado",
        "frequency": "0",
        "type" : "4",
        "description" : "Pérdida de sangre, generalmente más abundante.",
        "image": "http://localhost:3000/iconos/sintomas/78.png"
      },
      //Aqui empiezan preguntas sobre actos sexuales
      {
        "name": "Relacion sexual",
        "frequency": "0",
        "type" : "5",
        "description" : "Si tiene acto sexual o no",
        "image": "http://localhost:3000/iconos/sintomas/79.png"
      },
      {
        "name": "Relacion sexual con protección",
        "frequency": "0",
        "type" : "5",
        "description" : "si uso proteccion o no en el acto",
        "image": "http://localhost:3000/iconos/sintomas/80.png"
      },
      {
        "name": "Orgasmo",
        "frequency": "0",
        "type" : "5",
        "description" : "orgasmo ",
        "image": "http://localhost:3000/iconos/sintomas/81.png"
      },
      {
        "name": "Ocasiones que lo hizo",
        "frequency": "0",
        "type" : "5",
        "description" : "cantidad de heces que lo hizo",
        "image": "http://localhost:3000/iconos/sintomas/82.png"
      },
      {
        "name": "Personas con las que lo hizo",
        "frequency": "0",
        "type" : "5",
        "description": "cantidad de personas con las que lo hizo",
        "image": "http://localhost:3000/iconos/sintomas/83.png"
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