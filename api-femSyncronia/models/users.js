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
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastname: {
            type: DataTypes.STRING,
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
            allowNull: false,
            unique: true, // Agrega esta línea para la restricción única
            validate: {
                isEmail: true, // Validación de formato de email
            }
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
        when_your_period_came: { //cuando llego tu periodo?
            type: DataTypes.DATE,
            allowNull: true
          },
        recording_period:{ //0=No, 1=Si, 2=Aveces
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Have_symptoms:{ //0=No, 1=Si, 2=Aveces
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Affects_skin:{//0=No, 1=Si, 2= No lo se
            type:DataTypes.INTEGER,
            allowNull: true
        },
        Affects_weight:{//0=No, 1=Si, 2= No lo se
            type:DataTypes.INTEGER,
            allowNull: true
        },
        Affects_dream:{//0=No, 1=Si, 2= No lo se
            type:DataTypes.INTEGER,
            allowNull: true
        },
        Affects_energy:{//0=No, 1=Si, 2= No lo se
            type:DataTypes.INTEGER,
            allowNull: true
        },
        Affects_appetite:{//0=No, 1=Si, 2= No lo se
            type:DataTypes.INTEGER,
            allowNull: true
        },
        Affects_humour:{//0=No, 1=Si, 2= No lo se
            type:DataTypes.INTEGER,
            allowNull: true
        },
        Regular_cycle:{ //0=No, 1=Sí, 2=Tal vez
            type: DataTypes.INTEGER,
            allowNull:true,
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

