const express = require('express');
const router = express.Router();

const cyclesController = require('../controllers/cycles');
const crons_statusController = require('../controllers/crons_status');
const usuarioController = require('../controllers/usuario');
const usersController = require('../controllers/users');
const emailsController = require('../controllers/emails');
const user_statusesController = require('../controllers/user_status');
const crons_Controller = require('../controllers/crons');
const cycle_symptoms_Controller = require('../controllers/cycle_symptoms');
const doctors_Controller = require('../controllers/doctors');
const patient_data_Controller = require('../controllers/patient_data');
const report_status_Controller = require('../controllers/report_status');
const reports_Controller = require('../controllers/reports');
const symptoms_Controller = require('../controllers/symptoms.js');

const { uploadImage } = require('../controllers/imageController');
const upload = require('../middlewares/upload'); // Middleware de Multer

// Ruta para subir imágenes
router.post('/upload', upload.single('image'), uploadImage);


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

//cycles
router.post('/api/v1/cycles', cyclesController.store);
router.get('/api/v1/cycles', cyclesController.index);
router.get('/api/v1/cycles/:id', cyclesController.show);
router.put('/api/v1/cycles/:id', cyclesController.update);
router.delete('/api/v1/cycles/:id', cyclesController.destroy);

//Crons_status
router.post('/api/v1/cronsstatus', crons_statusController.store);
router.get('/api/v1/cronsstatus', crons_statusController.index);
router.get('/api/v1/cronsstatus/:id', crons_statusController.show);
router.put('/api/v1/cronsstatus/:id', crons_statusController.update);
router.delete('/api/v1/cronsstatus/:id', crons_statusController.destroy);

//Crons
router.post('/api/v1/crons', crons_Controller.store);
router.get('/api/v1/crons', crons_Controller.index);
router.get('/api/v1/crons/:id', crons_Controller.show);
router.put('/api/v1/crons/:id', crons_Controller.update);
router.delete('/api/v1/crons/:id', crons_Controller.destroy);

//Cycle_symptoms
router.post('/api/v1/cycle_symptoms', cycle_symptoms_Controller.store);
router.get('/api/v1/cycle_symptoms', cycle_symptoms_Controller.index);
router.get('/api/v1/cycle_symptoms/:id', cycle_symptoms_Controller.show);
router.put('/api/v1/cycle_symptoms/:id', cycle_symptoms_Controller.update);
router.delete('/api/v1/cycle_symptoms/:id', cycle_symptoms_Controller.destroy);

//doctors
router.post('/api/v1/doctors', doctors_Controller.store);
router.get('/api/v1/doctors', doctors_Controller.index);
router.get('/api/v1/doctors/:id', doctors_Controller.show);
router.put('/api/v1/doctors/:id', doctors_Controller.update);
router.delete('/api/v1/doctors/:id', doctors_Controller.destroy);

//patient-data
router.post('/api/v1/patient_data', patient_data_Controller.store);
router.get('/api/v1/patient_data', patient_data_Controller.index);
router.get('/api/v1/patient_data/:id', patient_data_Controller.show);
router.put('/api/v1/patient_data/:id', patient_data_Controller.update);
router.delete('/api/v1/patient_data/:id', patient_data_Controller.destroy);

//report_status
router.post('/api/v1/report_status', report_status_Controller.store);
router.get('/api/v1/report_status', report_status_Controller.index);
router.get('/api/v1/report_status/:id', report_status_Controller.show);
router.put('/api/v1/report_status/:id', report_status_Controller.update);
router.delete('/api/v1/report_status/:id', report_status_Controller.destroy);

//report_status
router.post('/api/v1/reports', reports_Controller.store);
router.get('/api/v1/reports', reports_Controller.index);
router.get('/api/v1/reports/:id', reports_Controller.show);
router.put('/api/v1/reports/:id', reports_Controller.update);
router.delete('/api/v1/reports/:id', reports_Controller.destroy);

//symptoms
router.post('/api/v1/symptoms', symptoms_Controller.store);
router.get('/api/v1/symptoms', symptoms_Controller.index);
router.get('/api/v1/symptoms/:id', symptoms_Controller.show);
router.put('/api/v1/symptoms/:id', symptoms_Controller.update);
router.delete('/api/v1/symptoms/:id', symptoms_Controller.destroy);





module.exports = {
   router
}
