'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class values_users extends Model {

    static associate(models) {
    }
  }
  values_users.init({

    id_user:{
      type: DataTypes.DATE,
      allowNull: false
    }, 
    weight:{
      type: DataTypes.DATE,
      allowNull: true
    }, 
    temperature: {
      type: DataTypes.DATE,
      allowNull: true
    }, 
    height: {
      type: DataTypes.DATE,
      allowNull: true
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
        modelName: 'values_users',
        defaultScope: {
            attributes: {
                exclude: ['updatedAt','deletedAt']
            }
        }
  });
  return values_users;
};