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
            body { 
                font-family: 'Segoe UI', Roboto, sans-serif; 
                background-color: #fbf3f3;
                color: #1e1c1c;
                margin: 20px;
                text-align: center;
            }
            h1 {
                color: #90575d;
                border-bottom: 3px solid #f2a8bc;
                padding-bottom: 10px;
                font-size: 28px;
            }
            .codigo { 
                font-size: 28px; 
                color: #ad727d; 
                font-weight: 800;
                letter-spacing: 3px;
                background: #fbbec9;
                padding: 15px;
                border-radius: 8px;
                display: inline-block;
                margin: 15px 0;
            }
            p {
                line-height: 1.6;
                font-size: 16px;
                color: #1e1c1c;
            }
            .footer {
                margin-top: 25px;
                color: #a2a9c3;
                font-size: 14px;
            }
            .footer strong {
                color: #dd8f97;
            }
        </style>
    </head>
    <body>
        <h1>FemSyncronia 🌸</h1>
        <p>¡Hola! Tu código de verificación es:</p>
        <p class="codigo">${codigo}</p>
        <p>Este código expirará en <strong>10 minutos</strong>.</p>
        <div class="footer">
            <p><strong>MID Tech</strong> - Coding the future</p>
            <p>Sincroniza tu vida, cuida tu ciclo.</p>
        </div>
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