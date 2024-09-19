'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
     },
    profile_image: {
    type: DataTypes.STRING,
    allowNull: false
    },
    password: {
    type: DataTypes.STRING,
    allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
      },
    token: {
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
    deleted_at: {
      allowNull: false, 
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};