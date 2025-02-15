"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        birthdate: "1990-01-01",
        username: "issac213",
        user_status: 1,
        name: "Issac",
        lastname: "Hernandez",
        email: "issac@example.com",
        profile_image: "profile.jpg",
        password: "hashedpassword1",
        phone: "1234567890",
        token: "sometoken"
      },
      {
        birthdate: "1990-01-01",
        username: "User00",
        user_status: 1,
        name: "Mally",
        lastname: "Hernandez",
        email: "mally@example.com",
        profile_image: "profile.jpg",
        password: "hashedpassword2",
        phone: "3315156132",
        token: "sometoken"
      },
      {
        birthdate: "1990-01-01",
        username: "diego213",
        user_status: 1,
        name: "Diego",
        lastname: "Ruiz",
        email: "diego@example.com",
        profile_image: "profile.jpg",
        password: "hashedpassword3",
        phone: "3315156189",
        token: "sometoken"
      },
      {
        birthdate: "2005-01-01",
        username: "user1",
        user_status: 1,
        name: "Prueba1",
        lastname: "Ruiz",
        email: "prueba1@example.com",
        profile_image: "profile.jpg",
        password: "hashedpassword3",
        phone: "3345896231",
        token: "sometoken"
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {
      truncate: null,
    });
  },
};
