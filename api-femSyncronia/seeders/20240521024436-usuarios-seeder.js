'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
        */
        await queryInterface.bulkInsert('usuarios', [
            {
                email: "diego@digiatlhinkers.net",
                password: "123456",
                phone: "3171124717"
            }
        ])
    },

    async down (queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('usuarios', null, {
            truncate:null
        });
    }
};
