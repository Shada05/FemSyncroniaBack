const crons_status  = require('../models').crons_status;

exports.store = async (req, res) => {
    const crons_stats = {
        name: req.body.name,
        status: req.body.status
    }
    console.log(crons_stats);

    crons_status.create(crons_stats).then(
        crons_stats => res.status(200).send(crons_stats)
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
    const crons_stats = await crons_status.findOne({
        where: {
            id: id
        }
    });

    return res.status(200).send(crons_stats);
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
    if (req.body.status != null) updatedData['status']= req.body.status;

    return await crons_status.update(updatedData, {
        where: {
            id: id
        }
    }).then(
        async ([updated]) => {
            const cron_statusUpd = await crons_status.findOne({where: {id}})
            if (updated) {
                res.status(200).send({ data: cron_statusUpd });
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