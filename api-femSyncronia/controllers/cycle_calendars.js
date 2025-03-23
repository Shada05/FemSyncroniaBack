const cycle_calendars  = require('../models').cycle_calendars;

exports.store = async (req, res) => {
    const cycle_calendar = {
        
        cycle_status: req.body.cycle_status,
        Start_day: req.body.Start_day,
        Finish_day: req.body.Finish_day,
        average_periodo: req.body.average_periodo, //duracion del ciclo mestrual
        average_ciclo: req.body.average_ciclo,  //duracion del ciclo
        average_mestruation: req.body.average_mestruation, //duracion de la menstruacion
        Regular_cycle: req.body.Regular_cycle
        
    }
    console.log(cycle_calendar);

    cycle_calendars.create(cycle_calendar).then(
        cycle_calendar => res.status(200).send(cycle_calendar)
    ).catch(
        error => res.status(400).send(error)
    );
}

exports.index = async (req, res) =>{
    return await cycle_calendars.findAll({

    }).then(
        cycle_calendars => res.status(200).send(cycle_calendars)
    ).catch(
        error => {
            console.log(error)
            res.status(400).send(error)
        }
    );
}

exports.show = async (req, res) => {
    const id = parseInt(req.params.id);
    const cycle_calendar = await cycle_calendars.findOne({
        where: {
            id: id
        }
    });

    return res.status(200).send(cycle_calendar);
}

exports.destroy = async (req, res) => {
    const id = parseInt(req.params.id);

    return await cycle_calendars.destroy({
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
    if (req.body.average_mestruation != null) updatedData['average_mestruation']= req.body.average_mestruation;
    if (req.body.Regular_cycle != null) updatedData['Regular_cycle']= req.body.Regular_cycle;
    return await cycle_calendars.update(updatedData, {
        where: {
            id: id
        }
    }).then(
        async ([updated]) => {
            const userUpd = await cycle_calendars.findOne({where: {id}})
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