const user_status  = require('../models').user_status;

exports.store = async (req, res) => {
    const user_state = {
        name: req.body.name,
        status: req.body.status
    }
    console.log(user_status);

    user_status.create(user_state).then(
        user_status => res.status(200).send(user_state)
    ).catch(
        error => res.status(400).send(error)
    );
}

exports.index = async (req, res) =>{
    return await user_status.findAll({

    }).then(
        user_status => res.status(200).send(user_status)
    ).catch(
        error => {
            console.log(error)
            res.status(400).send(error)
        }
    );
}

exports.show = async (req, res) => {
    const id = parseInt(req.params.id);
    const user_state = await user_status.findOne({
        where: {
            id: id
        }
    });
    return res.status(200).send(user_state);
}

exports.destroy = async (req, res) => {
    const id = parseInt(req.params.id);

    return await user_status.destroy({
        where: {
            id: id
        }
    }).then(
        deleted => {
            if (deleted) {
                res.status(200).send({ message: 'Estado eliminado con éxito' });
            } else {
                res.status(404).send({ message: 'Estado no encontrado' });
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
    let updatedData = {};

    if (req.body.name != null) updatedData['name']= req.body.name;
    if (req.body.status != null) updatedData['status']= req.body.status;

    return await user_status.update(updatedData, {
        where: {
            id: id
        }
    }).then(
        async ([updated]) => {
            const user_statusUpd = await user_status.findOne({where: {id}})
            if (updated) {
                res.status(200).send({ data: user_statusUpd });
            } else {
                res.status(404).send({ message: 'El estado no fue encontrado' });
            }
        }
    ).catch(
        error => {
            console.log(error);
            res.status(400).send(error);
        }
    );
};