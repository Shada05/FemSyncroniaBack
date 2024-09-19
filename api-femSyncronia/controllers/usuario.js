const usuario  = require('../models').usuario;

exports.store = async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    }
    console.log(user);

    return await usuario.create(user).then(
        usuario => res.status(200).send(usuario)
    ).catch(
        error => res.status(400).send(error)
    );
}

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