// Manejo de subida de imágenes
exports.uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha proporcionado ninguna imagen.' });
    }

    // Información del archivo subido
    const fileInfo = {
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    };

    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`; // URL de la imagen

    res.status(200).json({ message: 'Imagen subida exitosamente.', imageUrl });
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    res.status(500).json({ message: 'Error interno al procesar la imagen.' });
  }
};