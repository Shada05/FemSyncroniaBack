'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class crons extends Model {
    static associate(models) {
      // define association here
    }
  }
  crons.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    cron_status: DataTypes.INTEGER,
    seconds: DataTypes.INTEGER,
    minutes: DataTypes.INTEGER,
    hours: DataTypes.INTEGER,
    day_of_month: DataTypes.INTEGER,
    day_of_week: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'crons',
    timestamps: false, // Asegúrate de esto si no estás usando timestamps automáticos
  });
  return crons;
};
