'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class emails extends Model {
    static associate(models) {
      // define association here
    }
  }
  emails.init({

        main: {
            type:DataTypes.STRING(255),
            allowNull: false
        },
        type:{
            type:DataTypes.STRING(255),
            allowNull: false  
        },
        host: {
            type:DataTypes.STRING(255),
            allowNull: false  
        },
        port: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        username: {
            type:DataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type:DataTypes.STRING(255),
            allowNull: false
        },
        encryption: {
            type:DataTypes.STRING(255),
            allowNull: false
        },
        from_name: {
            type:DataTypes.STRING(255),
            allowNull: false
        },
        from_address: {
            type:DataTypes.STRING(255),
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
    modelName: 'emails',
    defaultScope: {
        attributes: {
            exclude: ['deletedAt', 'updateAte','port', 'password']
        }
    }

  });
  return emails;
};
