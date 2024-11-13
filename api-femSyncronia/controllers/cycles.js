const cycles  = require('../models').cycles;

exports.store = async (req, res) => {
    const cycle = {
        
        cycle_status: req.body.cycle_status,
        weight: req.body.weight,
        temperature: req.body.temperature,
        start_date: req.body.start_date,
        end_date: req.body.end_date
        
    }
    console.log(cycle);

    cycles.create(cycle).then(
        cycle => res.status(200).send(cycle)
    ).catch(
        error => res.status(400).send(error)
    );
}

exports.index = async (req, res) =>{
    return await cycles.findAll({

    }).then(
        cycles => res.status(200).send(cycles)
    ).catch(
        error => {
            console.log(error)
            res.status(400).send(error)
        }
    );
}

exports.show = async (req, res) => {
    const id = parseInt(req.params.id);
    const cycle = await cycles.findOne({
        where: {
            id: id
        }
    });

    return res.status(200).send(cycle);
}

exports.destroy = async (req, res) => {
    const id = parseInt(req.params.id);

    return await cycles.destroy({
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

    if (req.body.cycle_status != null) updatedData['cycles_status']= req.body.cycle_status;
    if (req.body.weight != null) updatedData['weight']= req.body.weigth;
    if (req.body.temperature != null) updatedData['temperature']= req.body.temperature;
    if (req.body.start_date != null) updatedData['start_date']= req.body.start_date;
    if (req.body.end_date != null) updatedData['end_date']= req.body.end_date;


    return await cycles.update(updatedData, {
        where: {
            id: id
        }
    }).then(
        async ([updated]) => {
            const userUpd = await cycles.findOne({where: {id}})
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