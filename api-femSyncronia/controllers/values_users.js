const values_users  = require('../models').values_users;

exports.store = async (req, res) => {
    const values = {
        
        id_user: req.body.id_user,
        weight: req.body.weight,
        temperature: req.body.temperature,
        start_date: req.body.start_date,
        end_date: req.body.end_date
        
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

    if (req.body.values_status != null) updatedData['valuess_status']= req.body.values_status;
    if (req.body.weight != null) updatedData['weight']= req.body.weigth;
    if (req.body.temperature != null) updatedData['temperature']= req.body.temperature;
    if (req.body.start_date != null) updatedData['start_date']= req.body.start_date;
    if (req.body.end_date != null) updatedData['end_date']= req.body.end_date;

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