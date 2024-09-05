const  Emails = require('../models/emails'); // Verifica que la ruta sea correcta

exports.createEmail = async (req, res) => {
  try {
    const newEmail = await Emails.create(req.body);
    res.status(201).json(newEmail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el email', details: error.message });
  }
};

exports.getAllEmails = async (req, res) => {
  return await Emails.findAll({

  }).then(
      emails => res.status(200).send(Emails)
  ).catch(
      error => {
          console.log(error)
          res.status(400).send(error)
      }
  );
}


exports.getEmailById = async (req, res) => {
  try {
    const email = await Emails.findByPk(req.params.id);
    if (email) {
      res.json(email);
    } else {
      res.status(404).json({ error: 'Email no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el email' });
  }
};

exports.updateEmail = async (req, res) => {
  try {
    const email = await Emails.findByPk(req.params.id);
    if (email) {
      await email.update(req.body);
      res.json(email);
    } else {
      res.status(404).json({ error: 'Email no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el email' });
  }
};

exports.deleteEmail = async (req, res) => {
  try {
    const email = await Emails.findByPk(req.params.id);
    if (email) {
      await email.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Email no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el email' });
  }
};
