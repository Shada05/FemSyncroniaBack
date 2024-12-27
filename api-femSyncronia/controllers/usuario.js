const usuario  = require('../models').usuario;
const bcrypt = require('bcrypt');

exports.store = async (req, res) => {
    try {
        const { email, password, phone } = req.body;

        // Verificar si el email ya está registrado
        const existingUser = await usuario.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send({ message: 'El email ya está registrado.' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 8); // 10 es el número de rondas de sal

        // Crear el usuario con el email y la contraseña hash
        const newUser = await usuario.create({
            email,
            password: hashedPassword,
            phone
        });

        return res.status(201).send(newUser);
    } catch (error) {
        console.error(error);
        return res.status(400).send({ message: 'Ocurrió un error al crear el usuario.', error });
    }
};

exports.index = async (req, res) =>{
    return await usuario.findAll({

    }).then(
        usuario => res.status(200).send(usuario)
    ).catch(
        error => {
            console.log(error)
            res.status(400).send(error)
        }
    );
}

exports.show = async (req, res) => {
    const id = parseInt(req.params.id);



    const user = await usuario.findOne({
        where: {
            id: id
        }
    });

    return res.status(200).send(user);
}

exports.destroy = async (req, res) => {
    const id = parseInt(req.params.id);

    return await usuario.destroy({
        where: {
            id: id
        }
    }).then(
        deleted => {
            if (deleted) {
                res.status(200).send({ message: 'Usuario eliminado con éxito' });
            } else {
                res.status(404).send({ message: 'Usuario no encontrado' });
            }
        }
    ).catch(
        error => {
            console.log(error);
            res.status(400).send(error);
        }
    );
};

exports.update = async (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = {
        email: req.body.email,
        password: req.body.password
    };

    return await usuario.update(updatedData, {
        where: {
            id: id
        }
    }).then(
        ([updated]) => {
            if (updated) {
                res.status(200).send({ message: 'Usuario actualizado con éxito' });
            } else {
                res.status(404).send({ message: 'Usuario no encontrado' });
            }
        }
    ).catch(
        error => {
            console.log(error);
            res.status(400).send(error);
        }
    );
};