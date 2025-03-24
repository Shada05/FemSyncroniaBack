'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cycle_calendars extends Model {

    static associate(models) {
    }
  }
  cycle_calendars.init({

    cycle_status:{
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    Start_day:{ //INICIO DE ESE PERIODO
      type: DataTypes.DATEONLY,
      allowNull: true
    }, 
    Finish_day: { //FIN DEL PERIODO
      type: DataTypes.DATEONLY,
      allowNull: true
    }, 
    average_periodo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    average_ciclo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    average_mestruation: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Regular_cycle:{ //0=regular, 1=Irregular
      type: DataTypes.INTEGER,
      allowNull:true,
      references: {
        model: 'users', // Nombre de la tabla a la que hace referencia
        key: 'Regular_cycle'       // Columna de la tabla referenciada
    }
    },
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
        modelName: 'cycle_calendars',
        defaultScope: {
            attributes: {
                exclude: ['updatedAt','deletedAt']
            }
        }
  });
  return cycle_calendars;
};