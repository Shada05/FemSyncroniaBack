'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  reports.init({
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    patient_data_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    pdf_path: {
      type: DataTypes.STRING,
      allowNull:false
    },
    generation_date: {
      type: DataTypes.DATE,
      allowNull:false
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
        modelName: 'reports',
        defaultScope: {
            attributes: {
                exclude: ['updatedAt','deletedAt']
            }
        }
  });
  return reports;
};