"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        birthdate: "1999-01-01",
        username: "User00",
        user_status: 1, // 1 = active, 0 = inactive
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
        username: "issac213",
        user_status: 1, // 1 = active, 0 = inactive
        name: "Issac",
        lastname: "Hernandez",
        email: "issac@example.com",
        profile_image: "profile.jpg",
        password: "$2b$08$naEdiARSzginAwq5kxf5meBRD0/TL5gdM00MsmL0V/2qH581a/7R.", //hashedpassword
        phone: "1234567890",
        token: "sometoken"
      },
      
      {
        birthdate: "1990-01-01",
        username: "diego213",
        user_status: 1, // 1 = active, 0 = inactive
        name: "Diego",
        lastname: "Ruiz",
        email: "diego@example.com",
        profile_image: "profile.jpg",
        password: "hashedpassword3",
        phone: "3315156189",
        token: "sometoken"
      },
        {
          "birthdate": "2005-01-01",
          "username": "user4",
          "user_status": 1,
          "name": "Prueba1",
          "lastname": "Ruiz",
          "email": "user4@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword4",
          "phone": "3345896232",
          "token": "token4"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user5",
          "user_status": 1,
          "name": "Prueba5",
          "lastname": "Ruiz",
          "email": "user5@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword5",
          "phone": "3345896233",
          "token": "token5"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user6",
          "user_status": 1,
          "name": "Prueba6",
          "lastname": "Ruiz",
          "email": "user6@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword6",
          "phone": "3345896234",
          "token": "token6"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user7",
          "user_status": 1,
          "name": "Prueba7",
          "lastname": "Ruiz",
          "email": "user7@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword7",
          "phone": "3345896235",
          "token": "token7"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user8",
          "user_status": 1,
          "name": "Prueba8",
          "lastname": "Ruiz",
          "email": "user8@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword8",
          "phone": "3345896236",
          "token": "token8"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user9",
          "user_status": 1,
          "name": "Prueba9",
          "lastname": "Ruiz",
          "email": "user9@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword9",
          "phone": "3345896237",
          "token": "token9"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user10",
          "user_status": 1,
          "name": "Prueba10",
          "lastname": "Ruiz",
          "email": "user10@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword10",
          "phone": "3345896238",
          "token": "token10"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user11",
          "user_status": 1,
          "name": "Prueba11",
          "lastname": "Ruiz",
          "email": "user11@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword11",
          "phone": "3345896239",
          "token": "token11"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user12",
          "user_status": 1,
          "name": "Prueba12",
          "lastname": "Ruiz",
          "email": "user12@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword12",
          "phone": "3345896240",
          "token": "token12"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user13",
          "user_status": 1,
          "name": "Prueba13",
          "lastname": "Ruiz",
          "email": "user13@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword13",
          "phone": "3345896241",
          "token": "token13"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user14",
          "user_status": 1,
          "name": "Prueba14",
          "lastname": "Ruiz",
          "email": "user14@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword14",
          "phone": "3345896242",
          "token": "token14"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user15",
          "user_status": 1,
          "name": "Prueba15",
          "lastname": "Ruiz",
          "email": "user15@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword15",
          "phone": "3345896243",
          "token": "token15"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user16",
          "user_status": 1,
          "name": "Prueba16",
          "lastname": "Ruiz",
          "email": "user16@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword16",
          "phone": "3345896244",
          "token": "token16"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user17",
          "user_status": 1,
          "name": "Prueba17",
          "lastname": "Ruiz",
          "email": "user17@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword17",
          "phone": "3345896245",
          "token": "token17"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user18",
          "user_status": 1,
          "name": "Prueba18",
          "lastname": "Ruiz",
          "email": "user18@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword18",
          "phone": "3345896246",
          "token": "token18"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user19",
          "user_status": 1,
          "name": "Prueba19",
          "lastname": "Ruiz",
          "email": "user19@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword19",
          "phone": "3345896247",
          "token": "token19"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user20",
          "user_status": 1,
          "name": "Prueba20",
          "lastname": "Ruiz",
          "email": "user20@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword20",
          "phone": "3345896248",
          "token": "token20"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user21",
          "user_status": 1,
          "name": "Prueba21",
          "lastname": "Ruiz",
          "email": "user21@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword21",
          "phone": "3345896249",
          "token": "token21"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user22",
          "user_status": 1,
          "name": "Prueba22",
          "lastname": "Ruiz",
          "email": "user22@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword22",
          "phone": "3345896250",
          "token": "token22"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user23",
          "user_status": 1,
          "name": "Prueba23",
          "lastname": "Ruiz",
          "email": "user23@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword23",
          "phone": "3345896251",
          "token": "token23"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user24",
          "user_status": 1,
          "name": "Prueba24",
          "lastname": "Ruiz",
          "email": "user24@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword24",
          "phone": "3345896252",
          "token": "token24"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user25",
          "user_status": 1,
          "name": "Prueba25",
          "lastname": "Ruiz",
          "email": "user25@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword25",
          "phone": "3345896253",
          "token": "token25"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user26",
          "user_status": 1,
          "name": "Prueba26",
          "lastname": "Ruiz",
          "email": "user26@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword26",
          "phone": "3345896254",
          "token": "token26"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user27",
          "user_status": 1,
          "name": "Prueba27",
          "lastname": "Ruiz",
          "email": "user27@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword27",
          "phone": "3345896255",
          "token": "token27"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user28",
          "user_status": 1,
          "name": "Prueba28",
          "lastname": "Ruiz",
          "email": "user28@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword28",
          "phone": "3345896256",
          "token": "token28"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user29",
          "user_status": 1,
          "name": "Prueba29",
          "lastname": "Ruiz",
          "email": "user29@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword29",
          "phone": "3345896257",
          "token": "token29"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user30",
          "user_status": 1,
          "name": "Prueba30",
          "lastname": "Ruiz",
          "email": "user30@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword30",
          "phone": "3345896258",
          "token": "token30"
        },
        {
          "birthdate": "2005-01-01",
          "username": "user31",
          "user_status": 1,
          "name": "Prueba25",
          "lastname": "Ruiz",
          "email": "user31@example.com",
          "profile_image": "profile.jpg",
          "password": "hashedpassword31",
          "phone": "3345896259",
          "token": "token31"
        },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {
      truncate: null,
    });
  },
};
