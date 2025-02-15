const { generarCodigo, enviarCodigo } = require('../middlewares/emailService');

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
    const { email, codigo } = req.body;
    // Verifica si el correo existe en el almacenamiento temporal
    const codigoGuardado = codigosTemporales[email];
    if (!codigoGuardado) {
        return res.status(400).json({ valido: false, mensaje: "Código no encontrado." });
    }

    // Verifica si el código ha expirado
    if (Date.now() > codigoGuardado.expiracion) {
        delete codigosTemporales[email]; // Elimina el código expirado
        return res.status(400).json({ valido: false, mensaje: "Código expirado." });
    }

    // Compara el código recibido con el código guardado
    // Asegúrate de que ambos sean del mismo tipo (números o cadenas)
    if (codigoGuardado.codigo.toString() === codigo.toString()) {
        delete codigosTemporales[email]; // Elimina el código después de validar
        return res.status(200).json({ valido: true, mensaje: "Código correcto." });
    } else {
        return res.status(400).json({ valido: false, mensaje: "Código incorrecto." });
    }
};