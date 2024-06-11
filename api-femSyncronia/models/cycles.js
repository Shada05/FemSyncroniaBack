'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cycles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cycles.init({
    id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    cycle_status: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    temperature: DataTypes.FLOAT,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    created_at: DataTypes.DATE,
    update_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'cycles',
  });
  return cycles;
};