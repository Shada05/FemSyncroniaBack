'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        static associate(models) {
        }
    }
    users.init({
        birthdate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_status: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profile_image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        token: {
            type: DataTypes.STRING,
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
        deletedAt: {
            allowNull: true, 
            type: DataTypes.DATE,
        }
    }, 
    {
        sequelize,
        modelName: 'users',
        defaultScope: {
            attributes: {
                exclude: ['password','token','updatedAt','deletedAt']
            }
        }
    });
    return users;
};

