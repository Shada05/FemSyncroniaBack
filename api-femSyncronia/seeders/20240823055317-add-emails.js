"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("emails", [
      {
        main: "diego.ruiz2863@alumnos.udg.mx",
        type: "SMTP",
        host: "smtp.example.com",
        port: 587,
        username: "Diego",
        password: "Prueba123",
        encryption: "TLS",
        from_name: "Diego",
        from_address: "example@example.com",
      },
      {
        main: "issac.hernandez2871@alumnos.udg.mx",
        type: "SMTP",
        host: "smtp.example.com",
        port: 587,
        username: "Issac",
        password: "Prueba123",
        encryption: "TLS",
        from_name: "Issac",
        from_address: "example@example.com",
      },
      {
        main: "mally.hernandez2861@alumnos.udg.mx",
        type: "SMTP",
        host: "smtp.example.com",
        port: 587,
        username: "Mally",
        password: "Prueba123",
        encryption: "TLS",
        from_name: "Mally",
        from_address: "example@example.com",
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("emails", null, {
      truncate: null,
    });
  },
};
