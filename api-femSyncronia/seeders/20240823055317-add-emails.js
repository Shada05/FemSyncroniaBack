"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("emails", [
      {
        app_id: "1",
        main: "diego@example.com",
        type: "SMTP",
        host: "smtp.example.com",
        port: 587,
        username: "user",
        password: "pass",
        encryption: "TLS",
        from_name: "Diego",
        from_address: "example@example.com",
        created_at: new Date(),
        updated_at: new Date(), // Corregido aquí
        deleted_at: null,
      },
      {
        app_id: "2",
        main: "issac@example.com",
        type: "SMTP",
        host: "smtp.example.com",
        port: 587,
        username: "user",
        password: "pass",
        encryption: "TLS",
        from_name: "Issac",
        from_address: "example@example.com",
        created_at: new Date(),
        updated_at: new Date(), // Corregido aquí
        deleted_at: null,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("emails", null, {
      truncate: null,
    });
  },
};
