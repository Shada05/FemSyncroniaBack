const cycles  = require('../models').cycles;

exports.store = async (req, res) => {
    const cycle = {
        cycles_status: req.body.cycles_status,
        weigth: req.body.weigth,
        temperature: req.body.temperature,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        
    }
    console.log(cycles);

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

    if (req.body.cycles_status != null) updatedData['cycles_status']= req.body.cycles_status;
    if (req.body.weigth != null) updatedData['weigth']= req.body.weigth;
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