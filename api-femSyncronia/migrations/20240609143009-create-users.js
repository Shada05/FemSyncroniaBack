'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            lastname: {
                type: Sequelize.STRING
            },
            birthdate: {
                type: Sequelize.DATE
            },
            username: {
                type: Sequelize.STRING
            },
            user_status: {
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.STRING
            },
            profile_image: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            token: {
                type: Sequelize.STRING
            },
            when_your_period_came: {
                type: Sequelize.DATE
            },
            recording_period: {
                type: Sequelize.INTEGER
            },
            Have_symptoms: {
                type: Sequelize.INTEGER
            },
            Affects_skin: {//0=No, 1=Si, 2= No lo se
                type: Sequelize.INTEGER
            },
            Affects_weight: {//0=No, 1=Si, 2= No lo se
                type: Sequelize.INTEGER
            },
            Affects_dream: {//0=No, 1=Si, 2= No lo se
                type: Sequelize.INTEGER
            },
            Affects_energy: {//0=No, 1=Si, 2= No lo se
                type: Sequelize.INTEGER
            },
            Affects_appetite: {//0=No, 1=Si, 2= No lo se
                type: Sequelize.INTEGER
            },
            Affects_humour: {//0=No, 1=Si, 2= No lo se
                type: Sequelize.INTEGER
            },
            Regular_cycle: { //0=No regular, 1=Regular
                type: Sequelize.INTEGER
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now')
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now')
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    }
};