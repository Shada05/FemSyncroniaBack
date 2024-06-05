const usuario  = require('../models').usuario;

exports.store = async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
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
