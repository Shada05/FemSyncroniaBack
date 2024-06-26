'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
      /**
       * Add altering commands here.
       *
       * Example:
       * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
       */

        await queryInterface.addColumn('usuarios', "phone", {
            allowNull: true, 
            type: Sequelize.STRING(10),
            after: 'password'
        });
        //crear 
    },

    async down (queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('usuarios', 'phone');
    }
};
