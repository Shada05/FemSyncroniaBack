// src/controllers/emailController.js
const { generarCodigo, enviarCodigo } = require('../middlewares/emailService');

// Almacenamiento temporal (en producción usa una base de datos)
const codigosTemporales = {};

exports.enviarCodigoVerificacion = async (req, res) => {
    const { email } = req.body;

    try {
        const codigo = generarCodigo();

        // Guarda el código con su fecha de expiración (10 minutos)
        codigosTemporales[email] = {
            codigo: codigo,
            expiracion: Date.now() + 600000, // 10 minutos en milisegundos
        };

        // Envía el correo
        await enviarCodigo(email, codigo);

        res.status(200).json({ mensaje: 'Código enviado correctamente.' });
    } catch (error) {
        console.error('Error al enviar el código:', error);
        res.status(500).json({ mensaje: 'Error al enviar el código.' });
    }
};

exports.validarCodigo = (req, res) => {
    const { email, codigoIngresado } = req.body;

    const codigoGuardado = codigosTemporales[email];

    if (!codigoGuardado) {
        return res.status(400).json({ valido: false, mensaje: "Código no encontrado." });
    }

    if (Date.now() > codigoGuardado.expiracion) {
        delete codigosTemporales[email]; // Elimina el código expirado
        return res.status(400).json({ valido: false, mensaje: "Código expirado." });
    }

    if (codigoGuardado.codigo === parseInt(codigoIngresado)) {
        delete codigosTemporales[email]; // Elimina el código después de validar
        return res.status(200).json({ valido: true, mensaje: "Código correcto." });
    } else {
        return res.status(400).json({ valido: false, mensaje: "Código incorrecto." });
    }
};
