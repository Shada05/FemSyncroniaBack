'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cycles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cycles.init({
    cycle_status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    temperature: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    DM_1: { //Colicos
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    DM_2: { //Dolor de pecho
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
      DM_3: { //Sensibilidad mamaria
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    DM_4: { //dolor de pecho
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    DM_5: { //Dolor de cabeza
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    DM_6: { //Migraña
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    DM_7: { //Hinchazon
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    DM_8: { //Dolor lumbar
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    DM_9: { //Dolor de espalda
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    DM_10: { //Calambres abdominales
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    DM_11: { //Dolor de zona pélvica
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    DM_12: { //Dolor de muscular
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    DM_13: { //Dolor de piernas
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    DM_14: { //calambres
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    DM_15: { //Dolor de articulaciones
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    DM_16: { //Dolor de extremidades
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    DM_17: { //Dolor por ovulación
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    DM_18: { //Dolores corporales
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    //Aqui terminan los dolores menstruales
    //Aqui empiezan los malestares
    M_1: { //Gripe
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_2: { //Escalofrios	
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_3: { //Fiebre
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_4: { //Mareos
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_5: { //Nauseas
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_6: { //Vómitos
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_7: { //Diarrea
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_8: { //Estreñimiento
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_9: { //Dispepsia
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_10: { //Gases
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_11: { //Fatiga
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_12: { //Insomnio
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_13: { //Antojos
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_14: { //exceso de apetito
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_15: { //Falta de apetito
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_16: { //Aumento de peso
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_17: { //sudoracion
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_18: { //sofocos
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_19: { //Dificultad para respirar
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    M_20: { //palpitaciones
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    
    //Aqui terminan los malestares
    //Aqui empiezan los problemas de piel
    PP_1: { //Acné
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    PP_2: { //Picazón
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    PP_3: { //Erupciones  
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    PP_4: { //Irritación
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    PP_5: { //Sequedad
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    //Aqui terminan los problemas de piel
    //Aqui empiezan los fluidos
    
    F_1: { //Abertura cervical
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    F_2: { //Flujo cervical
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    F_3: { //Firmeza cervical
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    F_4: { //fluido seco
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    F_5: { //Fluido pegajoso
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    F_6: { //Fluido cremoso
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    F_7: { //Fluido acuoso
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    F_8: { //Fluido clara de huevo
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    F_9: { //Fluido requesón
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    F_10: { //Fluido verde
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    F_11: { //Fluido con sangre
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    F_12: { //Fluido con mal olor
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    F_13: { //Retención de líquidos
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    F_14: { //Manchado
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    F_15: { //Sangrado
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    //Aqui terminan los fluidos

    //Aqui empiezan los actos sexual
    AS_1: { //Relaciones sexuales (si/no)
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    AS_2: { //Proteccion (si/no)
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    AS_3: { //organsmo (Si/No/ ni idea)
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    AS_4: { //Ocasiones (cantidad)
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    AS_5: { //Personas (Cantidad)
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    //Aqui terminan los actos sexual
    createdAt: {
        allowNull: false, 
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        allowNull: false, 
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    deletedAt: {
        allowNull: true, 
        type: DataTypes.DATE,
    }
  }, {
    sequelize,
        modelName: 'cycles',
        defaultScope: {
            attributes: {
                exclude: ['updatedAt','deletedAt']
            }
        }
  });
  return cycles;
};