'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cycle_symptoms extends Model {
    static associate(models) {
    }
  }
  cycle_symptoms.init({
    cycle_id:{
      type:  DataTypes.INTEGER,
      allowNull: false
    },
    symptom_id:{
      type: DataTypes.INTEGER,
      allowNull: false
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
        modelName: 'cycle_symptoms',
        defaultScope: {
            attributes: {
                exclude: ['updatedAt','deletedAt']
            }
        }
  });
  return cycle_symptoms;
};