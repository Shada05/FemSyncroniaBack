const patient_data  = require('../models').patient_data;

exports.store = async (req, res) => {
    const data = {
        
        user_id: req.body.user_id,
        cycle_id: req.body.cycle_id
        
    }
    console.log(data);

    patient_data.create(data).then(
        data => res.status(200).send(data)
    ).catch(
        error => res.status(400).send(error)
    );
}

exports.index = async (req, res) =>{
    return await patient_data.findAll({

    }).then(
        patient_data => res.status(200).send(patient_data)
    ).catch(
        error => {
            console.log(error)
            res.status(400).send(error)
        }
    );
}

exports.show = async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await patient_data.findOne({
        where: {
            id: id
        }
    });

    return res.status(200).send(data);
}

exports.destroy = async (req, res) => {
    const id = parseInt(req.params.id);

    return await patient_data.destroy({
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

    if (req.body.user_id != null) updatedData['user_id']= req.body.user_id;
    if (req.body.cycle_id != null) updatedData['cycle_id']= req.body.cycle_id;

    return await patient_data.update(updatedData, {
        where: {
            id: id
        }
    }).then(
        async ([updated]) => {
            const userUpd = await patient_data.findOne({where: {id}})
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