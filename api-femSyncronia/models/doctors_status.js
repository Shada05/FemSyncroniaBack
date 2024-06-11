'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doctors_status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  doctors_status.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    update_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'doctors_status',
  });
  return doctors_status;
};