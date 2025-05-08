const { generateToken } = require('../middlewares/auth');
const users = require('../models').users;
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { email, password } = req.body;


  try {
    // Buscar el usuario en la base de datos por email, incluyendo el password
    const user = await users.unscoped().findOne({
      where: { email },
      attributes: ['id', 'email', 'name', 'password', 'updateAt'] // Asegura que incluya la contraseña
    });

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado.' });
    }

    // Verifica que la contraseña almacenada no sea null
    if (!user.password) {
      return res.status(400).json({ message: 'El usuario no tiene una contraseña registrada.' });
    }

    // Comparar la contraseña ingresada con la almacenada (hasheada)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta.' });
    }

    // Generar un token JWT
    const token = generateToken(user);

    // Enviar la respuesta con el token y datos del usuario (sin la contraseña)
    return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });

  } catch (error) {
    console.error('Error en el servidor:', error);
    return res.status(500).json({ message: 'Error en el servidor.', error });
  }
};


// Método para verificar el token
exports.verificarToken = (req, res) => {
  res.json({ message: 'Token válido', user: req.user }); // Respuesta si el token es válido
};

// Registro de usuario con generación de token
exports.register = async (req, res) => {
  const newUser = { id, email } = req.body;

  try {

    // Generar token para el nuevo usuario
    const token = generateToken(newUser);

    return res.status(201).json({
      message: 'Usuario registrado con éxito',
      token
    });

  } catch (error) {
    console.error('Error en el servidor:', error);
    return res.status(500).json({ message: 'Error en el servidor.', error });
  }
}