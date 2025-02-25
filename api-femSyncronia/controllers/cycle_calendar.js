const cycle_calendar  = require('../models').cycle_calendar;

exports.store = async (req, res) => {
    const values = {
        
        cycle_status: req.body.cycle_status,
        Start_day: req.body.Start_day,
        Finish_day: req.body.Finish_day,
        average_periodo: req.body.average_periodo,
        average_ciclo: req.body.average_ciclo,
        average_periodo: req.body.average_periodo,
        Regular_cycle: req.body.Regular_cycle
        
    }
    console.log(values);

    valuess.create(values).then(
        values => res.status(200).send(values)
    ).catch(
        error => res.status(400).send(error)
    );
}

exports.index = async (req, res) =>{
    return await valuess.findAll({

    }).then(
        valuess => res.status(200).send(valuess)
    ).catch(
        error => {
            console.log(error)
            res.status(400).send(error)
        }
    );
}

exports.show = async (req, res) => {
    const id = parseInt(req.params.id);
    const values = await values.findOne({
        where: {
            id: id
        }
    });

    return res.status(200).send(values);
}

exports.destroy = async (req, res) => {
    const id = parseInt(req.params.id);

    return await valuess.destroy({
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

    if (req.body.cycle_status != null) updatedData['cycle_status']= req.body.cycle_status;
    if (req.body.Start_day != null) updatedData['Start_day']= req.body.weigth;
    if (req.body.Finish_day != null) updatedData['Finish_day']= req.body.Finish_day;
    if (req.body.average_periodo != null) updatedData['average_periodo']= req.body.average_periodo;
    if (req.body.average_ciclo != null) updatedData['average_ciclo']= req.body.average_ciclo;
    if (req.body.Regular_cycle != null) updatedData['Regular_cycle']= req.body.Regular_cycle;

    return await valuess.update(updatedData, {
        where: {
            id: id
        }
    }).then(
        async ([updated]) => {
            const userUpd = await valuess.findOne({where: {id}})
            if (updated) {
                res.status(200).send({ data: userUpd });
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