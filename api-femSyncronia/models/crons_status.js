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
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    cron_status: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    update_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'crons_status',
  });
  return crons_status;
};