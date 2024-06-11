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
    id: DataTypes.INTEGER,
    birthdate: DataTypes.DATE,
    username: DataTypes.STRING,
    user_status: DataTypes.INTEGER,
    email: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    token: DataTypes.STRING,
    created_at: DataTypes.DATE,
    update_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};