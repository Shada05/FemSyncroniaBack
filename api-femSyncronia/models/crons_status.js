'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class crons_status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  crons_status.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
        },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
    description: {
        type: DataTypes.STRING,
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
    modelName: 'crons_status',
    defaultScope: {
        attributes:{
            exclude: ['updateAt','deletedAt']
        }
    }
  });
  return crons_status;
};