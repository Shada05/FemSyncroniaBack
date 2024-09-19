const db = require('../models');
const { users } = db;

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const user = await users.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.findAll();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await users.findByPk(req.params.id);
    if (!user) {
<<<<<<< HEAD
      return res.status(404).json({ error: 'Usuario no encontrado' });
=======
      return res.status(404).json({ error: 'User not found' });
>>>>>>> origin/main
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
  try {
    const [updated] = await users.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedUser = await users.findByPk(req.params.id);
      return res.status(200).json(updatedUser);
    }
<<<<<<< HEAD
    throw new Error('Usuario no encontrado');
=======
    throw new Error('User not found');
>>>>>>> origin/main
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await users.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
<<<<<<< HEAD
      return res.status(204).send("Usuario eliminado");
    }
    throw new Error('Usuario no encontrado');
=======
      return res.status(204).send("User deleted");
    }
    throw new Error('User not found');
>>>>>>> origin/main
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
