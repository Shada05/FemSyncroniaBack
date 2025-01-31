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
        "image": "/api-femSyncronia/iconos/sintomas/01.png"
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
        "description": "Congestión nasal y malestar por infección respiratoria."
      },
      {
        "name": "Escalofríos",
        "frequency": "0",
        "type" : "1",
        "description": "Sensación de frío con temblores corporales."
      },
      {
        "name": "Fiebre",
        "frequency": "0",
        "type" : "1",
        "description": "Elevación de la temperatura corporal anormal."
      },
      {
        "name": "Mareos",
        "frequency": "0",
        "type" : "1",
        "description": "Sensación de inestabilidad o vértigo repentino."
      },
      {
        "name": "Náuseas",
        "frequency": "0",
        "type" : "1",
        "description": "Malestar estomacal con deseo de vomitar."
      },
      {
        "name": "Vómitos",
        "frequency": "0",
        "type" : "1",
        "description": "Expulsión forzada del contenido estomacal."
      },
      {
        "name": "Diarrea",
        "frequency": "0",
        "type" : "1",
        "description": "Heces líquidas frecuentes y dolor abdominal."
      },
      {
        "name": "Estreñimiento",
        "frequency": "0",
        "type" : "1",
        "description": "Dificultad para evacuar con frecuencia normal."
      },
      {
        "name": "Dispepsia",
        "frequency": "0",
        "type" : "1",
        "description": "Malestar digestivo en la parte alta del abdomen."
      },
      {
        "name": "Gases",
        "frequency": "0",
        "type" : "1",
        "description": "Acumulación de aire en el sistema digestivo."
      },
      {
        "name": "Fatiga",
        "frequency": "0",
        "type" : "1",
        "description": "Pérdida de fuerza física o energía general."
      },
      {
        "name": "Insomnio",
        "frequency": "0",
        "type" : "1",
        "description": "Dificultad persistente para conciliar o mantener el sueño."
      },
      {
        "name": "Antojos",
        "frequency": "0",
        "type" : "1",
        "description": "Deseo repentino e intenso de ciertos alimentos."
      },
      {
        "name": "Exceso de apetito",
        "frequency": "0",
        "type" : "1",
        "description": "Aumento inusual y constante del hambre."
      },
      {
        "name": "Falta de apetito",
        "frequency": "0",
        "type" : "1",
        "description": "Reducción significativa en el deseo de comer."
      },
      
      {
        "name": "Aumento de peso",
        "frequency": "0",
        "type" : "1",
        "description": "Incremento visible en la masa corporal."
      },
      {
        "name": "Sudoración",
        "frequency": "0",
        "type" : "1",
        "description": "Producción excesiva de sudor sin motivo claro."
      },
      {
        "name": "Sofocos",
        "frequency": "0",
        "type" : "1",
        "description": "Calor repentino y extremo, a menudo con sudoración."
      },
      {
        "name": "Dificultad para respirar",
          "frequency": "0",
        "type" : "1",
        "description": "Sensación de esfuerzo o incapacidad para inhalar aire."
      },
      {
        "name": "Palpitaciones",
        "frequency": "0",
        "type" : "1",
        "description": "Latidos cardíacos fuertes, rápidos o irregulares."
      },
       //Aquí termina los malestares e inicia los problemas de piel
      {
        "name": "Acné",
        "frequency": "0",
        "type" : "2",
        "description": "Brotes de granos o protuberancias en la piel."
      },
      {
        "name": "Picazón",
        "frequency": "0",
        "type" : "2",
        "description": "Sensación molesta que provoca ganas de rascarse."
      },
      {
        "name": "Erupciones",
        "frequency": "0",
        "type" : "2",
        "description": "Erupciones cutáneas con enrojecimiento o inflamación."

      },
      {
        "name": "Irritación",
        "frequency": "0",
        "type" : "2",
        "description": "Enrojecimiento o molestia en la piel."
      },
      {
        "name": "Sequedad",
        "frequency": "0",
        "type" : "2",
        "description": "Relacionada con piel áspera o deshidratada."
      },//Aquí termina los problemas de piel e inicia las emociones
      {
        "name": "feliz",
        "frequency": "0",
        "type" : "3",
        "description" : "Plenitud y alegría en el momento presente." 
      },
      {
        "name": "alegre",
        "frequency": "0",
        "type" : "3",
        "description" : "Estado de felicidad y entusiasmo." 
      },
      {
        "name": "orgullosa",
        "frequency": "0",
        "type" : "3",
        "description" : "Satisfacción personal por logros propios." 
      },
      {
        "name": "tranquila",
        "frequency": "0",
        "type" : "3",
        "description" : "Estado de calma y relajación." 
      },
      {
        "name": "neutral",
        "frequency": "0",
        "type" : "3",
        "description" : "Ausencia de emoción o preferencia." 
      },
      {
        "name": "triste",
        "frequency": "0",
        "type" : "3",
        "description" : "Sentimiento de melancolía o pesar." 
      },
      {
        "name": "deprimida",
        "frequency": "0",
        "type" : "3",
        "description" : "Estado persistente de tristeza y desmotivación." 
      },
      {
        "name": "enojada",
        "frequency": "0",
        "type" : "3",
        "description" : "Sentimiento de irritación intensa o desagrado" 
      },
      {
        "name": "irritada",
        "frequency": "0",
        "type" : "3",
        "description" : "Reacción fácil hacia el enojo o incomodidad." 
      },
      {
        "name": "sensible",
        "frequency": "0",
        "type" : "3",
        "description" : " Propensa a reaccionar emocionalmente con facilidad." 
      },
      {
        "name": "tensa",
        "frequency": "0",
        "type" : "3",
        "description" : "Sensación de rigidez física o emocional." 
      },
      {
        "name": "rara",
        "frequency": "0",
        "type" : "3",
        "description" : "Sensación de ser diferente o inusual." 
      },
      {
        "name": "estresada",
        "frequency": "0",
        "type" : "3",
        "description" : "Sensación de presión o tensión emocional." 
      },
      {
        "name": "ansiosa",
        "frequency": "0",
        "type" : "3",
        "description" : "Sensación de nerviosismo o inquietud." 
      },
      {
        "name": "angustiada",
        "frequency": "0",
        "type" : "3",
        "description" : "Ansiedad o preocupación extrema." 
      },
      {
        "name": "insegura",
        "frequency": "0",
        "type" : "3",
        "description" : "Sentimiento de duda sobre si misma o su entorno." 
      },
      {
        "name": "distraída",
        "frequency": "0",
        "type" : "3",
        "description" : "Falta de concentración por pensamientos o cosas externos." 
      },
      {
        "name": "olvidadiza",
        "frequency": "0",
        "type" : "3",
        "description" : "Tendencia a no recordar cosas fácilmente." 
      },
      {
        "name": "exhausta",
        "frequency": "0",
        "type" : "3",
        "description" : "Sentirse físicamente y mentalmente agotada." 
      },
      {
        "name": "libidinosa",
        "frequency": "0",
        "type" : "3",
        "description" : "Sentimiento fuerte de deseo físico." 
      },
      {
        "name": "coqueta",
        "frequency": "0",
        "type" : "3",
        "description" : "Sensación de seguridad y atractivo, con deseo de interactuar de manera romántica." 
      },

      {//Aquí termina las emociones e inician los fluidos
        "name": "Abertura cervical",
        "frequency": "0",
        "type" : "4",
        "description" : "Apertura o dilatación del cuello uterino."
      },
      {
        "name": "Flujo cervical",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción vaginal producida por el cuello uterino."
      },
      {
        "name": "Firmeza cervical",
        "frequency": "0",
        "type" : "4",
        "description" : "Consistencia del cuello uterino, de suave a dura."
      },
      {
        "name": "Fluido seco",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción cervical escasa o ausente."
      },
      {
        "name": "Fluido pegajoso",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción viscosa y espesa."
      },
      {
        "name": "Fluido cremoso",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción espesa y de textura similar a la crema."
      },
      {
        "name": "Fluido acuoso",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción líquida y transparente."
      },
      {
        "name": "Fluido clara de huevo",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción elástica y resbaladiza similar a la clara de huevo."
      },
      {
        "name": "Fluido requesón",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción espesa, grumosa, similar al queso."
      },
      {
        "name": "Fluido verde",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción de color verde, generalmente por infección."
      },
      {
        "name": "Fluido con sangre",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción que contiene sangre, de aspecto rojizo."
      },
      {
        "name": "Fluido con mal olor",
        "frequency": "0",
        "type" : "4",
        "description" : "Secreción vaginal con un olor desagradable."
      },
      {
        "name": "Retención de líquidos",
        "frequency": "0",
        "type" : "4",
        "description" : "Acumulación anormal de líquidos en el cuerpo."
      },
      {
        "name": "Manchado",
        "frequency": "0",
        "type" : "4",
        "description" : "Sangrado leve o irregular fuera del período."
      },
      {
        "name": "Sangrado",
        "frequency": "0",
        "type" : "4",
        "description" : "Pérdida de sangre, generalmente más abundante."
      },
      //Aqui empiezan preguntas sobre actos sexuales
      {
        "name": "Relacion sexual",
        "frequency": "0",
        "type" : "5",
        "description" : "Si tiene acto sexual o no"
      },
      {
        "name": "Relacion sexual con protección",
        "frequency": "0",
        "type" : "5",
        "description" : "si uso proteccion o no en el acto"
      },
      {
        "name": "Orgasmo",
        "frequency": "0",
        "type" : "5",
        "description" : "orgasmo "
      },
      {
        "name": "Ocasiones que lo hizo",
        "frequency": "0",
        "type" : "5",
        "description" : "cantidad de heces que lo hizo"
      },
      {
        "name": "Personas con las que lo hizo",
        "frequency": "0",
        "type" : "5",
        "description": "cantidad de personas con las que lo hizo"
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