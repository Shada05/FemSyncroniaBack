const crons  = require('../models').crons;

exports.store = async (req, res) => {
    const cron = {
        name: req.body.name,
        cron_status: req.body.cron_status,
        seconds: req.body.seconds,
        minutes: req.body.minutes,
        hours: req.body.hours,
        days_of_month: req.body.days_of_month,
        days_of_week: req.body.days_of_week
    }
    console.log(cron);

    crons.create(cron).then(
        cron => res.status(200).send(cron)
    ).catch(
        error => res.status(400).send(error)
    );
}

exports.index = async (req, res) =>{
    return await crons.findAll({

    }).then(
        crons => res.status(200).send(crons)
    ).catch(
        error => {
            console.log(error)
            res.status(400).send(error)
        }
    );
}

exports.show = async (req, res) => {
    const id = parseInt(req.params.id);
    const cron = await crons.findOne({
        where: {
            id: id
        }
    });

    return res.status(200).send(cron);
}

exports.destroy = async (req, res) => {
    const id = parseInt(req.params.id);

    return await crons.destroy({
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

    return await crons.update(updatedData, {
        where: {
            id: id
        }
    }).then(
        async ([updated]) => {
            const cronsUpd = await crons.findOne({where: {id}})
            if (updated) {
                res.status(200).send({ data: cronsUpd });
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