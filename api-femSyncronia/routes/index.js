const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario');
const emailsController = require('../controllers/emailsController');

// Rutas de usuario
router.post('/api/v1/usuario/', usuarioController.store);
router.get('/api/v1/usuario/:id', usuarioController.show);
router.get('/api/v1/usuario/', usuarioController.index);
router.delete('/api/v1/usuario/:id', usuarioController.destroy);
router.put('/usuarios/:id', usuarioController.update);

// Rutas de emails
router.post('/api/v1/emails/', emailsController.createEmail);
router.get('/api/v1/emails/:id', emailsController.getEmailById);
router.get('/api/v1/emails/', emailsController.getAllEmails);
router.put('/api/v1/emails/:id', emailsController.updateEmail);
router.delete('/api/v1/emails/:id', emailsController.deleteEmail);


// Rutas de Users
router.post('/api/v1/users/', usuarioController.store);


module.exports = {
   router
}
