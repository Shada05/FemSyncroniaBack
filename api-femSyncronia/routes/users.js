const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Crear un nuevo usuario
router.post('/', usersController.createUser);

// Obtener todos los usuarios
<<<<<<< HEAD
router.get('/', (req, res, next) => {
    res.send("Estamos en los usuarios");
    next();  // Llama al siguiente middleware o controlador
  }, usersController.getAllUsers);
=======
router.get('/', usersController.getAllUsers);
>>>>>>> origin/main

// Obtener un usuario por ID
router.get('/:id', usersController.getUserById);

// Actualizar un usuario por ID
router.put('/:id', usersController.updateUser);

// Eliminar un usuario por ID
router.delete('/:id', usersController.deleteUser);

module.exports = router;
<<<<<<< HEAD
//hola

=======
>>>>>>> origin/main
