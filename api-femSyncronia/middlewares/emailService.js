const nodemailer = require('nodemailer');

// Configura el transporter para enviar correos
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Genera un código de 6 dígitos
const generarCodigo = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

// Envía el correo con el código de verificación
const enviarCodigo = (email, codigo) => {
    console.log("Enviando correo a:", email); // Depuración
    console.log(codigo);
    if (!email) {
        throw new Error("No se ha proporcionado una dirección de correo electrónico.");
    }


    const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .codigo { font-size: 24px; color: #3498db; font-weight: bold; }
            </style>
        </head>
        <body>
            <h1>¡Hola!</h1>
            <p>Tu código de verificación es:</p>
            <p class="codigo">${codigo}</p>
            <p>Este código expirará en 10 minutos.</p>
        </body>
        </html>
    `;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Código de Verificación',
        html: htmlTemplate,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { generarCodigo, enviarCodigo };