'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class crons extends Model {
    static associate(models) {
      // define association here
    }
  }
  crons.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
      },
    cron_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    seconds: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    minutes:{ 
      type: DataTypes.INTEGER,
      allowNull: false
    },

    hours:{
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    
    day_of_month:{
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    
    day_of_week: {
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
        modelName: 'crons',
        defaultScope: {
            attributes: {
                exclude: ['updatedAt','deletedAt']
            }
        }
  });
  return crons;
};
