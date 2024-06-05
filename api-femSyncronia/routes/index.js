
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario');

router.post('/api/v1/usuario/', usuarioController.store);
router.get('/api/v1/usuario/:id', usuarioController.show);
router.get('/api/v1/usuario/', usuarioController.index);
/* Controllers */

// module.exports = (app) => {
//    app.get('/api', (req, res) => res.status(200).send ({
//         message: 'Example project did not give you access to the api web services',
//    }));

//    app.post('/api/v1/usuario/', usuarioController.store);
//    app.get('/api/v1/usuario/:id', usuarioController.show);
//    app.get('/api/v1/usuario/', usuarioController.index);
// };

module.exports = {
   router
}