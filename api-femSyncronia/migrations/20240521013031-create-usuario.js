'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('usuarios', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.STRING(120), 
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now')
            }
            });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('usuarios');
    }
};