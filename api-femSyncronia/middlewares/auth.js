const jwt = require('jsonwebtoken');
const secretKey = 'tu_clave_secreta';

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extraer el token del header "Bearer <token>"
  
  if (!token) return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido o expirado.' });
    req.user = user;
    next();
  });
};

module.exports = { generateToken, authenticateToken };