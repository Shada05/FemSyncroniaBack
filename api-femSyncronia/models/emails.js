'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class emails extends Model {
    static associate(models) {
      // define association here
    }
  }
  emails.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    app_id: {
      type:DataTypes.STRING(255),
      allowNull: false  
    },
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,  // Asigna automáticamente la fecha y hora actual
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'emails',
    timestamps: true,  // Para que Sequelize maneje automáticamente los timestamps
    createdAt: 'created_at', // Indica a Sequelize que use 'created_at'
    updatedAt: 'update_at',  // Indica a Sequelize que use 'update_at'
    deletedAt: 'deleted_at',  // Indica a Sequelize que use 'deleted_at' si usas soft deletes
    paranoid: true // Para activar soft deletes y que use la columna 'deleted_at'
  });
  return emails;
};
