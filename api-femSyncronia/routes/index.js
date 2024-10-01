const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario');
const usersController = require('../controllers/users');
const emailsController = require('../controllers/emails');
const user_statusesController = require('../controllers/user_status');

// Rutas de usuario
router.post('/api/v1/usuario/', usuarioController.store);
router.get('/api/v1/usuario/:id', usuarioController.show);
router.get('/api/v1/usuario/', usuarioController.index);
router.delete('/api/v1/usuario/:id', usuarioController.destroy);
router.put('/usuarios/:id', usuarioController.update);

// Rutas de emails
router.post('/api/v1/emails', emailsController.store);
router.get('/api/v1/emails', emailsController.index);
router.get('/api/v1/emails/:id', emailsController.show);
router.put('/api/v1/emails/:id', emailsController.update);
router.delete('/api/v1/emails/:id', emailsController.destroy);


// Rutas de Users
// Ruta para crear un usuario
router.post('/api/v1/users', usersController.store);
// Ruta para listar todos los usuarios
router.get('/api/v1/users', usersController.index);
// Ruta para mostrar un solo usuario por ID
router.get('/api/v1/users/:id', usersController.show);
// Ruta para actualizar un usuario
router.put('/api/v1/users/:id', usersController.update);
// Ruta para eliminar un usuario
router.delete('/api/v1/users/:id', usersController.destroy);

//user_status
router.post('/api/v1/users-status', user_statusesController.store);
router.get('/api/v1/users-status', user_statusesController.index);
router.get('/api/v1/users-status/:id', user_statusesController.show);
router.put('/api/v1/users-status/:id', user_statusesController.update);
router.delete('/api/v1/users-status/:id', user_statusesController.destroy);



module.exports = {
   router
}
