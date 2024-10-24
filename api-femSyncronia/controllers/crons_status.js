const crons_status  = require('../models').crons_status;

exports.store = async (req, res) => {
    const status = {
        name: req.body.name,
        crons_status: req.body.crons_status
    }
    console.log(crons_status);

    crons_status.create(status).then(
        status => res.status(200).send(status)
    ).catch(
        error => res.status(400).send(error)
    );
}

exports.index = async (req, res) =>{
    return await crons_status.findAll({

    }).then(
        crons_status => res.status(200).send(crons_status)
    ).catch(
        error => {
            console.log(error)
            res.status(400).send(error)
        }
    );
}

exports.show = async (req, res) => {
    const id = parseInt(req.params.id);



    const status = await crons_status.findOne({
        where: {
            id: id
        }
    });

    return res.status(200).send(status);
}

exports.destroy = async (req, res) => {
    const id = parseInt(req.params.id);

    return await crons_status.destroy({
        where: {
            id: id
        }
    }).then(
        deleted => {
            if (deleted) {
                res.status(200).send({ message: 'data eliminado con éxito' });
            } else {
                res.status(404).send({ message: 'data no encontrado' });
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
    if (req.body.crons_status != null) updatedData['crons_status']= req.body.crons_status;

    return await crons_status.update(updatedData, {
        where: {
            id: id
        }
    }).then(
        async ([updated]) => {
            const statusUpd = await crons_status.findOne({where: {id}})
            if (updated) {
                res.status(200).send({ data: statusUpd });
            } else {
                res.status(404).send({ message: 'data no encontrado' });
            }
        }
    ).catch(
        error => {
            console.log(error);
            res.status(400).send(error);
        }
    );
};