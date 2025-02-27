'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cycle_calendar extends Model {

    static associate(models) {
    }
  }
  cycle_calendar.init({

    cycle_status:{
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    Start_day:{ //INICIO DE ESE PERIODO
      type: DataTypes.DATE,
      allowNull: true
    }, 
    Finish_day: { //FIN DEL PERIODO
      type: DataTypes.DATE,
      allowNull: true
    }, 

    average_periodo: {
      type: DataTypes.DATE,
      allowNull: true
    },
    average_ciclo: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Regular_cycle:{ //0=No, 1=Sí, 2=Tal vez
      type: DataTypes.INTEGER,
      allowNull:true
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
        modelName: 'cycle_calendar',
        defaultScope: {
            attributes: {
                exclude: ['updatedAt','deletedAt']
            }
        }
  });
  return cycle_calendar;
};