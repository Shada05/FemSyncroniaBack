'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class usuario extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
        }
    }
    usuario.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
        email: {
            type: DataTypes.STRING(120),
            allowNull:false,
        },
        password: {
            type:  DataTypes.STRING(200),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(10),
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
    }, {
        sequelize,
        modelName: 'usuario',
    });
  return usuario;
};