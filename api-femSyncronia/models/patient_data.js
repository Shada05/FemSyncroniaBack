'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class patient_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  patient_data.init({
    id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    cycle_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    update_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'patient_data',
  });
  return patient_data;
};