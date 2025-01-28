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
  
      res.status(200).json({
        message: 'Imagen subida exitosamente.',
        file: fileInfo,
      });
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      res.status(500).json({ message: 'Error interno al procesar la imagen.' });
    }
  };
  